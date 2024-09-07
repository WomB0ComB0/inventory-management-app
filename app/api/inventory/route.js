import { firestore } from '@/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'

export async function GET() {
  console.log(`[${new Date().toISOString()}] Processing GET request`);
  try {
    const snapshot = await getDocs(collection(firestore, 'inventory'));
    const inventoryList = [];
    snapshot.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    console.log(`[${new Date().toISOString()}] Fetched ${inventoryList.length} items`);
    return new Response(JSON.stringify(inventoryList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error fetching inventory:`, error);
    return new Response(JSON.stringify({ error: 'Failed to fetch inventory' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request) {
  const { itemName } = await request.json();
  console.log(`[${new Date().toISOString()}] Processing POST request for item: ${itemName}`);
  const docRef = doc(collection(firestore, 'inventory'), itemName);
  const docSnap = await getDoc(docRef);
  try {
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      console.log(`[${new Date().toISOString()}] Updating existing item: ${itemName}, current quantity: ${quantity}`);
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      console.log(`[${new Date().toISOString()}] Adding new item: ${itemName}`);
      await setDoc(docRef, { quantity: 1 });
    }
    console.log(`[${new Date().toISOString()}] Item ${itemName} added/updated successfully`);
    return new Response(JSON.stringify({ message: 'Item added/updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error adding/updating item ${itemName}:`, error);
    return new Response(JSON.stringify({ error: 'Failed to add/update item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  const { itemName } = await request.json();
  console.log(`[${new Date().toISOString()}] Processing DELETE request for item: ${itemName}`);
  const docRef = doc(collection(firestore, 'inventory'), itemName);
  const docSnap = await getDoc(docRef);
  try {
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      console.log(`[${new Date().toISOString()}] Found item: ${itemName}, current quantity: ${quantity}`);
      if (quantity === 1) {
        console.log(`[${new Date().toISOString()}] Deleting item: ${itemName}`);
        await deleteDoc(docRef);
      } else {
        console.log(`[${new Date().toISOString()}] Decreasing quantity for item: ${itemName}`);
        await setDoc(docRef, { quantity: quantity - 1 });
      }
      console.log(`[${new Date().toISOString()}] Item ${itemName} removed successfully`);
      return new Response(JSON.stringify({ message: 'Item removed successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      console.log(`[${new Date().toISOString()}] Item not found: ${itemName}`);
      return new Response(JSON.stringify({ error: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error removing item ${itemName}:`, error);
    return new Response(JSON.stringify({ error: 'Failed to remove item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

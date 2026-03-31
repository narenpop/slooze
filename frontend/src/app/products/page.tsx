'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../../context/auth-context';
import { Product } from '../../lib/types';

export default function ProductsPage() {
  const { session } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!session) {
      return;
    }

    fetch('/products', {
      headers: { 'x-user-role': session.role },
    })
      .then((response) => response.json())
      .then((payload) => setProducts(payload));
  }, [session]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const product = {
      name: String(formData.get('name') ?? ''),
      commodityType: String(formData.get('commodityType') ?? ''),
      quantity: Number(formData.get('quantity') ?? 0),
      unitPrice: Number(formData.get('unitPrice') ?? 0),
      notes: String(formData.get('notes') ?? ''),
    };

    const response = await fetch('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-role': session.role,
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      const created = await response.json();
      setProducts((current) => [created, ...current]);
      event.currentTarget.reset();
    }
  };

  return (
    <main className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Products</h1>
      <form onSubmit={onSubmit} className="grid gap-2 rounded border p-4 md:grid-cols-2">
        <input className="rounded border p-2" name="name" placeholder="Name" />
        <input className="rounded border p-2" name="commodityType" placeholder="Commodity Type" />
        <input className="rounded border p-2" name="quantity" placeholder="Quantity" type="number" />
        <input className="rounded border p-2" name="unitPrice" placeholder="Unit Price" type="number" />
        <input className="rounded border p-2 md:col-span-2" name="notes" placeholder="Notes" />
        <button className="rounded bg-black px-3 py-2 text-white dark:bg-white dark:text-black md:col-span-2">
          Add Product
        </button>
      </form>

      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="rounded border p-3">
            <p className="font-medium">{product.name}</p>
            <p className="text-sm opacity-80">
              {product.commodityType} • Qty {product.quantity} • ${product.unitPrice}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { categories, formatPrice } from "@/data/products";
import type { Collection, ProductRow } from "@/lib/product-types";

// Editable form fields — numbers are held as strings while editing, then parsed
// on save. Mirrors the Supabase `products` columns.
type FormState = {
  id: string;
  name: string;
  category: string;
  price: string;
  discount_price: string;
  image: string;
  description: string;
  collection: Collection;
  is_flash_deal: boolean;
  sort_order: string;
};

const EMPTY_FORM: FormState = {
  id: "",
  name: "",
  category: categories[0]?.name ?? "",
  price: "",
  discount_price: "",
  image: "",
  description: "",
  collection: "featured",
  is_flash_deal: false,
  sort_order: "0",
};

const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm outline-none transition placeholder:text-zinc-400 hover:border-zinc-400 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-zinc-600";

function rowToForm(row: ProductRow): FormState {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: String(row.price),
    discount_price: row.discount_price == null ? "" : String(row.discount_price),
    image: row.image,
    description: row.description ?? "",
    collection: row.collection,
    is_flash_deal: row.is_flash_deal,
    sort_order: String(row.sort_order ?? 0),
  };
}

export default function AdminProducts() {
  const [rows, setRows] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Form state: `mode` null means the editor is closed.
  const [mode, setMode] = useState<"add" | "edit" | null>(null);
  const [originalId, setOriginalId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const fetchRows = useCallback(async () => {
    // No synchronous setState here — the query is awaited first, so this is safe
    // to call directly from an effect. `loading` starts true for the first load.
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("collection", { ascending: true })
      .order("sort_order", { ascending: true });
    if (error) {
      setLoadError(error.message);
      setRows([]);
    } else {
      setLoadError(null);
      setRows((data as ProductRow[] | null) ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time fetch of products on mount; state is set after the awaited query resolves
    fetchRows();
  }, [fetchRows]);

  function openAdd() {
    setMode("add");
    setOriginalId(null);
    setForm(EMPTY_FORM);
    setSaveError(null);
  }

  function openEdit(row: ProductRow) {
    setMode("edit");
    setOriginalId(row.id);
    setForm(rowToForm(row));
    setSaveError(null);
  }

  function closeForm() {
    setMode(null);
    setOriginalId(null);
    setSaveError(null);
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSave() {
    setSaveError(null);

    const id = form.id.trim();
    const name = form.name.trim();
    const price = Number(form.price);

    if (!id) return setSaveError("ID is required.");
    if (!name) return setSaveError("Name is required.");
    if (!form.price.trim() || Number.isNaN(price) || price < 0)
      return setSaveError("Price must be a non-negative number.");

    let discountPrice: number | null = null;
    if (form.discount_price.trim() !== "") {
      const d = Number(form.discount_price);
      if (Number.isNaN(d) || d < 0) return setSaveError("Discount must be a non-negative number.");
      discountPrice = d;
    }

    const sortOrder = form.sort_order.trim() === "" ? 0 : Number(form.sort_order);
    if (Number.isNaN(sortOrder)) return setSaveError("Sort order must be a number.");

    const payload = {
      id,
      name,
      price,
      discount_price: discountPrice,
      image: form.image.trim(),
      category: form.category.trim(),
      description: form.description.trim() === "" ? null : form.description.trim(),
      collection: form.collection,
      is_flash_deal: form.is_flash_deal,
      sort_order: sortOrder,
    };

    setSaving(true);
    const query =
      mode === "edit" && originalId
        ? supabase.from("products").update(payload).eq("id", originalId)
        : supabase.from("products").insert(payload);
    const { error } = await query;
    setSaving(false);

    if (error) {
      setSaveError(error.message);
      return;
    }

    closeForm();
    await fetchRows();
  }

  async function handleDelete(row: ProductRow) {
    if (!window.confirm(`Delete “${row.name}”? This cannot be undone.`)) return;
    const { error } = await supabase.from("products").delete().eq("id", row.id);
    if (error) {
      window.alert(`Delete failed: ${error.message}`);
      return;
    }
    await fetchRows();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Products</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {rows.length} product{rows.length === 1 ? "" : "s"} · changes go live on the store immediately.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="rounded-lg bg-gradient-to-b from-brand-red to-brand-red-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/10 transition-all hover:brightness-110 active:scale-[0.99]"
        >
          + Add product
        </button>
      </div>

      {/* Editor */}
      {mode && (
        <ProductForm
          mode={mode}
          form={form}
          saving={saving}
          saveError={saveError}
          onField={setField}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-soft dark:border-zinc-800 dark:bg-zinc-900">
        {loading ? (
          <p className="p-8 text-center text-sm text-zinc-500">Loading products…</p>
        ) : loadError ? (
          <p className="p-8 text-center text-sm text-rose-600">Failed to load: {loadError}</p>
        ) : rows.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">No products yet. Add one to get started.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/60">
                <tr>
                  <th className="px-4 py-3 font-semibold">Product</th>
                  <th className="px-4 py-3 font-semibold">Collection</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Discount</th>
                  <th className="px-4 py-3 text-center font-semibold">Flash</th>
                  <th className="px-4 py-3 text-center font-semibold">Order</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800">
                          {row.image && (
                            <Image
                              src={row.image}
                              alt=""
                              fill
                              sizes="44px"
                              unoptimized
                              className="object-cover"
                            />
                          )}
                        </span>
                        <div className="min-w-0">
                          <div className="truncate font-medium text-zinc-900 dark:text-white">
                            {row.name}
                          </div>
                          <div className="truncate text-xs text-zinc-400">
                            {row.id} · {row.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {row.collection === "featured" ? "Featured" : "New arrival"}
                    </td>
                    <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                      {formatPrice(Number(row.price))}
                    </td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                      {row.discount_price == null ? "—" : formatPrice(Number(row.discount_price))}
                    </td>
                    <td className="px-4 py-3 text-center">{row.is_flash_deal ? "✓" : "—"}</td>
                    <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-300">
                      {row.sort_order}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
                          className="rounded-md border border-zinc-300 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(row)}
                          className="rounded-md border border-rose-300 px-2.5 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950/40"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ProductForm({
  mode,
  form,
  saving,
  saveError,
  onField,
  onSave,
  onCancel,
}: {
  mode: "add" | "edit";
  form: FormState;
  saving: boolean;
  saveError: string | null;
  onField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
      className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-card ring-1 ring-inset ring-black/5 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-white/5"
    >
      <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-white">
        {mode === "add" ? "Add product" : `Edit product`}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="ID">
          <input
            value={form.id}
            onChange={(e) => onField("id", e.target.value)}
            disabled={mode === "edit"}
            placeholder="e.g. p9"
            className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`}
          />
        </Field>
        <Field label="Name">
          <input value={form.name} onChange={(e) => onField("name", e.target.value)} className={inputClass} />
        </Field>

        <Field label="Category">
          <input
            value={form.category}
            onChange={(e) => onField("category", e.target.value)}
            list="admin-category-options"
            className={inputClass}
          />
          <datalist id="admin-category-options">
            {categories.map((c) => (
              <option key={c.id} value={c.name} />
            ))}
          </datalist>
        </Field>
        <Field label="Image path / URL">
          <input
            value={form.image}
            onChange={(e) => onField("image", e.target.value)}
            placeholder="/products/example.jpg"
            className={inputClass}
          />
        </Field>

        <Field label="Price (৳)">
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => onField("price", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label="Discount price (৳, optional)">
          <input
            type="number"
            min="0"
            value={form.discount_price}
            onChange={(e) => onField("discount_price", e.target.value)}
            placeholder="Leave blank for none"
            className={inputClass}
          />
        </Field>

        <Field label="Collection">
          <select
            value={form.collection}
            onChange={(e) => onField("collection", e.target.value as Collection)}
            className={inputClass}
          >
            <option value="featured">Featured</option>
            <option value="new_arrival">New arrival</option>
          </select>
        </Field>
        <Field label="Sort order">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => onField("sort_order", e.target.value)}
            className={inputClass}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Description">
            <textarea
              value={form.description}
              onChange={(e) => onField("description", e.target.value)}
              rows={3}
              className={inputClass}
            />
          </Field>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300 sm:col-span-2">
          <input
            type="checkbox"
            checked={form.is_flash_deal}
            onChange={(e) => onField("is_flash_deal", e.target.checked)}
            className="h-4 w-4 accent-brand-red"
          />
          Show in Flash Deals
        </label>
      </div>

      {saveError && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
        >
          {saveError}
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-gradient-to-b from-brand-blue to-brand-blue-dark px-5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-white/10 transition-all hover:brightness-110 active:scale-[0.99] disabled:opacity-60"
        >
          {saving ? "Saving…" : mode === "add" ? "Create product" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</span>
      {children}
    </label>
  );
}

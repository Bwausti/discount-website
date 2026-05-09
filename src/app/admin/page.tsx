import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { brands, visibleProductPrice } from "@/lib/products";
import {
  readCatalogOverrides,
  writeCatalogOverrides,
  type ProductOverride,
} from "@/lib/catalog-overrides";

export const dynamic = "force-dynamic";

const cookieName = "discount_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD || "discount-admin";
}

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value === adminPassword();
}

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") ?? "");
  if (password !== adminPassword()) redirect("/admin?error=1");

  const cookieStore = await cookies();
  cookieStore.set(cookieName, password, {
    httpOnly: true,
    sameSite: "lax",
    path: "/admin",
  });
  redirect("/admin");
}

async function logout() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
  redirect("/admin");
}

async function saveProductOverride(formData: FormData) {
  "use server";
  if (!(await isAuthed())) redirect("/admin");

  const productId = String(formData.get("productId") ?? "");
  const hidden = formData.get("hidden") === "on";
  const override: ProductOverride = {
    priceAmount: clean(formData.get("priceAmount")),
    priceLabel: clean(formData.get("priceLabel")),
    promoHeadline: clean(formData.get("promoHeadline")),
    promoValue: clean(formData.get("promoValue")),
    promoCode: clean(formData.get("promoCode")),
    badge: clean(formData.get("badge")),
    availability: clean(formData.get("availability")),
    hidden,
  };

  const overrides = readCatalogOverrides();
  const hasValues = Object.entries(override).some(([key, value]) =>
    key === "hidden" ? value === true : Boolean(value),
  );

  if (hasValues) {
    overrides.products[productId] = override;
  } else {
    delete overrides.products[productId];
  }

  writeCatalogOverrides(overrides);
  revalidatePath("/");
  revalidatePath("/collections");
  revalidatePath(`/mattresses/${productId}`);
  redirect(`/admin?saved=${encodeURIComponent(productId)}`);
}

function clean(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : undefined;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  const authed = await isAuthed();
  const params = await searchParams;

  if (!authed) {
    return (
      <main className="min-h-screen bg-[#fbfaf4] px-4 py-12 text-slate-950">
        <div className="mx-auto max-w-md rounded-[24px] border border-[#dedbd2] bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black tracking-tight">Discount Mattress Admin</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
            Sign in to update visible prices, promos, badges, and availability notes.
          </p>
          {params.error ? (
            <p className="mt-4 rounded bg-red-50 px-3 py-2 text-sm font-bold text-red-700">
              Incorrect password.
            </p>
          ) : null}
          <form action={login} className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-black text-slate-900">
              Password
              <input
                name="password"
                type="password"
                className="rounded border border-slate-300 px-3 py-3 text-base font-semibold"
              />
            </label>
            <button className="rounded bg-[#162b49] px-5 py-3 text-sm font-black text-white">
              Sign in
            </button>
          </form>
        </div>
      </main>
    );
  }

  const overrides = readCatalogOverrides();

  return (
    <main className="min-h-screen bg-[#fbfaf4] px-4 py-8 text-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-[#dedbd2] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#cf2333]">
              Internal
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Catalog Admin</h1>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600">
              Edits are saved to the override file. With the current static site setup, production
              changes become public after rebuild/redeploy.
            </p>
            {overrides.updatedAt ? (
              <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Last override save: {new Date(overrides.updatedAt).toLocaleString("en-US")}
              </p>
            ) : null}
            {params.saved ? (
              <p className="mt-3 rounded bg-green-50 px-3 py-2 text-sm font-bold text-green-800">
                Saved {params.saved}.
              </p>
            ) : null}
          </div>
          <form action={logout}>
            <button className="rounded border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800">
              Sign out
            </button>
          </form>
        </div>

        <div className="mt-8 grid gap-8">
          {brands.map((brand) => (
            <section key={brand.id} className="rounded-[24px] border border-[#dedbd2] bg-white p-5 shadow-sm">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-2xl font-black">{brand.name}</h2>
                  <p className="text-sm font-semibold text-slate-600">{brand.products.length} products</p>
                </div>
              </div>
              <div className="grid gap-4">
                {brand.products.map((product) => {
                  const override = overrides.products[product.id] ?? {};
                  const visiblePrice = visibleProductPrice(product);

                  return (
                    <details
                      key={product.id}
                      className="rounded-2xl border border-slate-200 bg-[#fbfaf4] p-4"
                    >
                      <summary className="cursor-pointer list-none">
                        <div className="grid gap-2 md:grid-cols-[1fr_auto] md:items-center">
                          <div>
                            <p className="text-lg font-black">{product.model}</p>
                            <p className="text-sm font-semibold text-slate-600">
                              Current: {visiblePrice.label} {visiblePrice.amount}
                            </p>
                          </div>
                          <p className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-slate-600">
                            {product.type}
                          </p>
                        </div>
                      </summary>
                      <form action={saveProductOverride} className="mt-5 grid gap-4">
                        <input type="hidden" name="productId" value={product.id} />
                        <div className="grid gap-4 md:grid-cols-2">
                          <Field name="priceAmount" label="Displayed price" defaultValue={override.priceAmount} placeholder={visiblePrice.amount} />
                          <Field name="priceLabel" label="Price label" defaultValue={override.priceLabel} placeholder={visiblePrice.label} />
                          <Field name="promoHeadline" label="Promo headline" defaultValue={override.promoHeadline} placeholder={product.promo?.headline ?? "Current offer"} />
                          <Field name="promoValue" label="Promo value" defaultValue={override.promoValue} placeholder={product.promo?.value ?? "25% off"} />
                          <Field name="promoCode" label="Promo code" defaultValue={override.promoCode} placeholder={product.promo?.code ?? "Optional"} />
                          <Field name="badge" label="Badge" defaultValue={override.badge} placeholder={product.badge ?? "Optional"} />
                        </div>
                        <label className="grid gap-2 text-sm font-black text-slate-900">
                          Availability note
                          <textarea
                            name="availability"
                            defaultValue={override.availability ?? ""}
                            placeholder={product.availability}
                            className="min-h-24 rounded border border-slate-300 px-3 py-3 text-sm font-semibold"
                          />
                        </label>
                        <label className="flex items-center gap-2 text-sm font-black text-slate-900">
                          <input name="hidden" type="checkbox" defaultChecked={override.hidden} />
                          Hide from public catalog
                        </label>
                        <button className="w-fit rounded bg-[#cf2333] px-5 py-3 text-sm font-black text-white">
                          Save product override
                        </button>
                      </form>
                    </details>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function Field({
  name,
  label,
  defaultValue,
  placeholder,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-black text-slate-900">
      {label}
      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className="rounded border border-slate-300 px-3 py-3 text-sm font-semibold"
      />
    </label>
  );
}

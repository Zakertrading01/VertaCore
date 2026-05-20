import { revalidatePath } from "next/cache";

export function revalidateSolution(slug: string) {
  revalidatePath(`/solutions/${slug}`);
  revalidatePath("/solutions");
  revalidatePath("/");
}

export function revalidateIndustry(slug: string) {
  revalidatePath(`/industries/${slug}`);
  revalidatePath("/industries");
  revalidatePath("/");
}

export function revalidateCatalogueItem() {
  revalidatePath("/catalogue");
  revalidatePath("/");
}

export function revalidateProject(slug: string) {
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/projects");
  revalidatePath("/");
}

export function revalidateCertification() {
  revalidatePath("/certifications");
}

export function revalidateBrand(slug: string) {
  revalidatePath(`/brands/${slug}`);
  revalidatePath("/brands");
}

export function revalidateInsight(slug: string) {
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/insights");
}

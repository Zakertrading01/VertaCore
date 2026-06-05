import { revalidatePath, revalidateTag } from "next/cache";

const bust = {};

export function revalidateSolution(slug: string) {
  revalidateTag('solution-pages', bust);
  revalidateTag(`solution-${slug}`, bust);
  revalidateTag('catalogue', bust);
  revalidatePath(`/solutions/${slug}`);
  revalidatePath("/solutions");
  revalidatePath("/");
}

export function revalidateIndustry(slug: string) {
  revalidateTag('industries', bust);
  revalidateTag(`industry-${slug}`, bust);
  revalidatePath(`/industries/${slug}`);
  revalidatePath("/industries");
  revalidatePath("/");
}

export function revalidateCatalogueItem() {
  revalidateTag('catalogue', bust);
  revalidatePath("/catalogue");
  revalidatePath("/");
}

export function revalidateProject(slug: string) {
  revalidateTag('projects', bust);
  revalidateTag(`project-${slug}`, bust);
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/projects");
  revalidatePath("/");
}

export function revalidateCertification() {
  revalidateTag('certifications', bust);
  revalidatePath("/certifications");
}

export function revalidateBrand(slug: string) {
  revalidateTag('brands', bust);
  revalidateTag(`brand-${slug}`, bust);
  revalidatePath(`/brands/${slug}`);
  revalidatePath("/brands");
}

export function revalidateInsight(slug: string) {
  revalidateTag('insights', bust);
  revalidateTag(`insight-${slug}`, bust);
  revalidatePath(`/insights/${slug}`);
  revalidatePath("/insights");
}

export function revalidateSolutions() {
  revalidateTag('solutions', bust);
  revalidatePath("/solutions");
}

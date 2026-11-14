import { MEMBER_SECTION_IDS } from "@/config/navigation";
export function sectionHash(section: keyof typeof MEMBER_SECTION_IDS): string {
  return `#${MEMBER_SECTION_IDS[section]}`;
}

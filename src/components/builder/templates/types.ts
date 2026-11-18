import type { PreviewStyle } from "@/config/business-templates";
import type { TemplateCopy } from "../template-copy";

export type TemplateProps = {
  name: string;
  style: PreviewStyle;
  color: string;
  copy: TemplateCopy;
};

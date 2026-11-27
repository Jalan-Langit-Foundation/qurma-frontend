import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, DemoSection } from "../demo-section";

export function BaseUiSection() {
  return (
    <DemoSection
      id="base-ui"
      eyebrow="03. Komponen Inti"
      title="Button & Badge"
      description={
        <>
          Komponen dasar dari <Code>components/ui</Code>.
        </>
      }
    >
      <Card className="space-y-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="white" className="border-slate-200">
            White
          </Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="primary" isLoading>
            Memproses
          </Button>
          <Button variant="primary" disabled>
            Nonaktif
          </Button>
          <Button
            variant="primary"
            size="sm"
            rightIcon={
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            }
          >
            Small Icon
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 border-t border-slate-100 pt-4">
          <Badge variant="primary">Primary Soft</Badge>
          <Badge variant="secondary">Sky Blue</Badge>
          <Badge variant="brand">Brand Solid</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success" dot>
            Success
          </Badge>
          <Badge variant="warning" dot>
            Warning
          </Badge>
          <Badge variant="destructive" dot>
            Destructive
          </Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="rope" size="sm">
            Rope Ribbon
          </Badge>
        </div>
      </Card>
    </DemoSection>
  );
}

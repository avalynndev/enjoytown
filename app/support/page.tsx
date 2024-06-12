import Image from "next/image";
import { Pattern } from "@/components/pattern";
import { SiteHeader } from "@/components/navbar/site-header";
import * as Craft from "@/components/craft";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Add this import statement

export default function BuyMeCoffeePage() {
  return (
    <>
      <Pattern variant="checkered" />
      <SiteHeader />
      <div className="mx-auto max-w-4xl p-4">
        <section className="flex h-[75vh] items-center md:h-[50vh]">
          <div className="mx-auto flex w-4/5 flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-6xl font-bold">
              Support EnjoyTown
            </h1>
            <p className="text-sm leading-6 text-muted-foreground">
              If you enjoy using EnjoyTown and would like to support its development, you can buy me a coffee!
            </p>
            <div className="flex gap-2">
              <a href="https://www.buymeacoffee.com/" target="_blank" rel="noopener noreferrer">
                <Button variant="default">
                  Buy Me Coffee
                </Button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

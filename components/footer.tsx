import { Icons } from "@/components/icons";

export async function Footer() {
  return (
    <footer className="bg-transparent py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center space-x-4">
            <a href="/" className="">
              <Icons.orbit className="h-6 w-6" />
            </a>
          </div>
          {/**<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <a href="/about" className="transition-colors duration-300">
                      About
                    </a>
                    <a href="/contact" className="transition-colors duration-300">
                      Contact
                    </a>
                    <a href="/terms" className="transition-colors duration-300">
                      Terms
                    </a>
                    <a href="/privacy" className="transition-colors duration-300">
                      Privacy
                    </a>
                  </div>
                  **/}
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
          <p className="text-sm">© 2024 EnjoyTown. All rights reserved.</p>
          <p className="text-sm">Crafted with ❤️</p>
        </div>
      </div>
    </footer>
  );
}

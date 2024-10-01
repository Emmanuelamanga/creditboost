import React from 'react'
import { Img } from 'react-image';
import { Link, useLocation } from "react-router-dom"

import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Header({ searchbar }) {

    //initialize location
    const location = useLocation()

    // Split the current path into segments
    const pathSegments = location.pathname.split('/').filter(Boolean);

    // Dynamically generate breadcrumb items based on path segments
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`; // Generate the correct path for each breadcrumb item

        // Capitalize the first letter of each breadcrumb item
        const segmentLabel = segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
            <BreadcrumbItem key={path}>
                {index + 1 === pathSegments.length ? (
                    <BreadcrumbPage>{segmentLabel}</BreadcrumbPage>
                ) : (
                    <BreadcrumbLink asChild>
                        <Link to={path}>{segmentLabel}</Link>
                    </BreadcrumbLink>
                )}
                {index + 1 !== pathSegments.length && <BreadcrumbSeparator />}
            </BreadcrumbItem>
        );
    });

    return (

        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Turbo Brok</span>
                        </Link>
                        <Link
                            to='/home'
                            className={`flex items-center gap-4 px-2.5 
                                ${location.pathname != '/home' ? 'text-muted-foreground' : ''}`}
                        >
                            <Home className="h-5 w-5" />
                            Dashboard
                        </Link>

                        <Link
                            to='/supplier/dashboard'
                            className={`flex items-center gap-4 px-2.5 
                             ${location.pathname != '/supplier/dashboard' ? 'text-muted-foreground' : ''}`}
                        >
                            <Package className="h-5 w-5" />
                            Store
                        </Link>
                        <Link
                            href="#"
                            className={`flex items-center gap-4 px-2.5 
                             ${location.pathname != 'products' ? 'text-muted-foreground' : ''}`}
                        >
                            <Users2 className="h-5 w-5" />
                            Customers
                        </Link>
                        <Link
                            href="#"
                            className={`flex items-center gap-4 px-2.5 
                                ${location.pathname != 'products' ? 'text-muted-foreground' : ''}`}
                        >
                            <LineChart className="h-5 w-5" />
                            Settings
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                    {/* <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="#">Products</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>All Products</BreadcrumbPage>
                    </BreadcrumbItem> */}
                    {breadcrumbItems}
                </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0">
                {searchbar && (
                    <>
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </>
                )}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="overflow-hidden rounded-full"
                    >
                        <Img
                            src="/placeholder-user.jpg"
                            width={36}
                            height={36}
                            alt="Avatar"
                            className="overflow-hidden rounded-full"
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    )
}

export default Header
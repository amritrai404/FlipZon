"use client"

import { useState } from "react"
import axios from "@/lib/axios"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { Product } from "@/types"

type AddProductDialogProps = {
    onAdd: (newProduct: Product) => void
}

export default function AddProductDialog({ onAdd }: AddProductDialogProps) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [error, setError] = useState("")
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleAddProduct = async () => {
        if (!title || !price || !description || !image) {
            setError("Please fill in all fields.")
            return
        }

        setLoading(true)
        setError("")

        try {
            const res = await axios.post("/products", {
                title,
                description,
                image,
                price: parseFloat(price),
            })

            onAdd(res.data)
            setOpen(false)
            // Reset form
            setTitle("")
            setDescription("")
            setPrice("")
            setImage("")
        } catch (err) {
            setError("Failed to add product.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <div className="flex justify-end mb-4">
                <AlertDialogTrigger asChild>
                    <Button>
                        <Plus size={20} className="mr-2" />
                        Add New Product
                    </Button>
                </AlertDialogTrigger>
            </div>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                        Add New Product
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-muted-foreground">
                        Fill in the details to add a new product to the catalog.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="MacBook Pro"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="M4 chip, 16GB RAM"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="99999"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="image">Image URL</Label>
                        <Input
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="https://example.com/product.png"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 font-medium">{error}</p>
                    )}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAddProduct} disabled={loading}>
                        {loading ? "Adding..." : "Add Product"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

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
import { Pencil } from "lucide-react"

interface Product {
  _id: string
  title: string
  description: string
  price: number
  image: string
}

interface EditProductDialogProps {
  product: Product
  onUpdate?: () => void // optional callback to refresh UI
}

export default function EditProductDialog({ product, onUpdate }: EditProductDialogProps) {
  const [title, setTitle] = useState(product.title)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(String(product.price))
  const [image, setImage] = useState(product.image)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleEditProduct = async () => {
    try {
      setLoading(true)
      setError("")

      await axios.put(`/products/${product._id}`, {
        title,
        description,
        price: parseFloat(price),
        image,
      })

      // Optional callback to parent
      onUpdate?.()
    } catch (err) {
      console.error("Failed to update product:", err)
      setError("Failed to update product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Pencil size={16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">Edit Product</AlertDialogTitle>
          <AlertDialogDescription className="text-center text-muted-foreground">
            Modify the product details and save changes.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleEditProduct} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

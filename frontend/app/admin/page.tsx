'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/lib/axios'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Loader2, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/types'
import AddProductDialog from '@/components/AddProductDialog'
import EditProductDialog from '@/components/EditProductDialog'

export default function AdminDashboard() {
    const router = useRouter()
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const fetchProducts = async () => {
        try {
            const res = await axios.get('/products')
            const updatedProducts = res.data.map((product: any) => ({
                ...product,
                price: Number(product.price),
            }))
            setProducts(updatedProducts)
        } catch (err) {
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const userData = localStorage.getItem('currentUser')
        if (userData) {
            const user = JSON.parse(userData)
            if (user.role === 'admin') {
                setIsAdmin(true)
                fetchProducts()
            } else {
                router.replace('/')
            }
        } else {
            router.replace('/login')
        }
    }, [router])

    const handleProductAdded = (newProduct: Product) => {
        setProducts(prev => [...prev, newProduct])
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/products/${id}`)
            setProducts(prev => prev.filter(p => p._id !== id))
        } catch (err) {
            console.error('Error deleting product:', err)
        }
    }

    if (isAdmin === null) return null // Avoids flashing before auth check

    return (
        <div className="py-20 px-6 space-y-6">
            <AddProductDialog onAdd={handleProductAdded} />

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>All Products</CardTitle>
                        <CardTitle>Total Products: {products.length}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="animate-spin w-6 h-6" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map(product => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.title}</TableCell>
                                        <TableCell>₹{product.price}</TableCell>
                                        <TableCell>
                                            <EditProductDialog
                                                product={product}
                                                onUpdate={fetchProducts}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() => handleDelete(product._id)}
                                            >
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}




export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export interface Product {
  _id: string;
  title: string; 
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CartItem {
  _id: string; // ID of the cart item
  product: string; // product ID (can also expand into Product object if populated)
  quantity: number;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  __v: number;
}

export interface AddProductDialogProps {
  onAdd: (product: {
    title: string;
    description: string;
    price:  number; // if you're using string from input
    image: string;
  }) => void;
}


export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

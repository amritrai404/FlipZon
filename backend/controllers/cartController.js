import Cart from '../models/Cart.js';

// Add to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const index = cart.items.findIndex(item => item.product.toString() === productId);

      if (index > -1) {
        cart.items[index].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }

      await cart.save();
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("Add to Cart Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json(cart);
  } catch (err) {
    console.error("Remove from Cart Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};


// Get Cart
export const getCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(200).json({ items: [] });  // return empty array if no cart
    }

    res.status(200).json({ items: cart.items });
  } catch (err) {
    console.error("Get Cart Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};



// Update cart
export const updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    if (quantity <= 0) {
      // Optional: remove the item if quantity is 0 or negative
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("Update Cart Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};


// clear cart
export const clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json(cart); 
    } catch (err) {
    console.error("Clear Cart Error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
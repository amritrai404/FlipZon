import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true,                      // SSL enable karte hain explicitly
      // Deprecated options hata diye jaise useNewUrlParser, useUnifiedTopology
      tlsAllowInvalidCertificates: false, // Production mein false rakhna, debugging ke liye true kar sakte hain
    });
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;

export type Product = {
  _id: string;
  title: string;
  price: number;
  discountpercentage: number;
  tags: string[];
  productImage: {
    asset: {
      _ref: string;
    };
  };
  description: string;
  available: boolean;
};

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter} from "@/components/ui/card";
import { product } from "@/models/productModel";

interface productCardProps {
  product: product;
}

export default function productCard({ product }: productCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1">
      <p className= "text-orange-200 mt-4 text-2xl font-bold">{product.title}</p>
      <p className="text-red-400 mt-4 text-2xl font-bold">{product.volumeNumber}</p>
      <p className="text-white-600 mt-4 text-2xl font-bold">{product.author}</p>
      <br></br>
        <p className="text-white-600">{product.synopsis}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.id}`} className="w-full">
          <Button className="bg-gradient-to-r from-yellow-300 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 w-full" >
            View product
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 
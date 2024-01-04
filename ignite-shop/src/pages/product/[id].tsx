import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import Stripe from "stripe"

import { stripe } from "@/lib/stripe"

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import Image from "next/image"

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
  }
}

export default function Product( { product } : ProductProps) {
/*   const {isFallback} = useRouter()

  if(isFallback) {
    return <p>Loading...</p>
  } */

  return(
    <ProductContainer>
      <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt=""/>
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: {id: 'prod_PBnVXXmexmTInn'}}
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  if(!params) {
    return {
      notFound: true // caso o paramentro não exista retorna um 404
    }
  }
  const productId = params.id // erro no params caso não resolva no arquivo tsconfig, a propriedade strict alterar seu valor para false, retirando verificações estritas do TS

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount! / 100), 
        description: product.description,
        }
      },
      revalidate: 60 * 60 * 1, // 1 hour
    }
  }
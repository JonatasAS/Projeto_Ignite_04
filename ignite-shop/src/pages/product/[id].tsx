import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { useRouter } from "next/router"

export default function Product() {
  const { query } = useRouter()

  return(
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>

      <ProductDetails>
        <h1>Camista X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nulla nostrum saepe, eaque magni accusantium modi voluptatem ab ea. Natus nisi unde dolorem a magni, minima amet in. Odio, quis!</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}
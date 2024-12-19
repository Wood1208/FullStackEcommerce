import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

import { Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/api/products";
import { ActivityIndicator } from "react-native";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(Number(id)),
  })

  if(isLoading) {
    return <ActivityIndicator />
  }

  if(error) {
    return <Text>Product not found!</Text>
  }

  if(!product) {
    return (
      <Text>
        Oh~ Product not found
      </Text> 
    )
  }

  return (
    <Box className="flex-1 items-center p-3">
      <Stack.Screen options={{ title: product.name }} />
      <Card className="flex-1 p-5 rounded-lg max-w-[560px]">
        <Image
          source={{
            uri: product.image,
          }}
          className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
          alt={`${product.name} image`}
          resizeMode="contain"
        />
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {product.name}
        </Text>
        <VStack className="mb-6">
          <Heading size="md" className="mb-4">
            ${product.price}
          </Heading>
          <Text size="sm">
            {product.description}
          </Text>
        </VStack>
        <Box className="flex-col sm:flex-row">
          <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
            <ButtonText size="sm">Add to cart</ButtonText>
          </Button>
          <Button
            variant="outline"
            className="px-4 py-2 border-outline-300 sm:flex-1"
          >
            <ButtonText size="sm" className="text-typography-600">
              Wishlist
            </ButtonText>
          </Button>
        </Box>
      </Card>
    </Box>
  )
}
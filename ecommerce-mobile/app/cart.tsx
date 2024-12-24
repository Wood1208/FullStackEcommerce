import { FlatList } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";

import { Redirect } from "expo-router";
import { createOrder } from "@/api/orders";
import { useCart } from "@/store/cartStore";
import { useMutation } from "@tanstack/react-query";

export default function CartScreen() {
  const items = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const createOrderMutation = useMutation({
    mutationFn: () => 
      createOrder(
        items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          price: item.product.price, //为了安全应该从数据库读取price
      }))
    ),
    onSuccess: (data) => {
      console.log(data);

      resetCart();
    },
    onError: (error) => {
      console.log(error);
    }
  });
  
  const onCheckout = async () => {
    createOrderMutation.mutate();
  };

  if(items.length === 0) {
    return <Redirect href={'/'} />
  }

  return (
    <FlatList 
      data={items}
      contentContainerClassName="gap-2 p-2"
      renderItem={({item}) => (
        <HStack className="bg-white p-3">
          <VStack space="sm">
            <Text bold>{item.product.name}</Text>
            <Text>$ {item.product.name}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Button onPress={onCheckout}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      )}
    />
  )
}
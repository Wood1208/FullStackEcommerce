import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ProductListItem from "@/components/ProductListItem";
import { Button, ButtonText } from "@/components/ui/button";
import { listProducts } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export default function Index() {
  const { data, isLoading, error } =  useQuery({
    queryKey: ['products'],
    queryFn: listProducts,
  });

  if(isLoading) {
    return <ActivityIndicator />
  }

  if(error) {
    return <Text>Error fetching products</Text>
  }

  return (
    <View>
      <FlatList 
        data={data}
        numColumns={2}
        contentContainerClassName="gap-2"
        columnWrapperClassName="gap-2"
        renderItem={({item}) => <ProductListItem product={item} />}
      />
      <Button>
        <ButtonText>Fuck me!</ButtonText>
      </Button>
    </View>
  );
}

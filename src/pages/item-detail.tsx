import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { 
  Button, 
  Card, 
  CardBody, 
  Chip, 
  Divider,
  Breadcrumbs,
  BreadcrumbItem,
  Tabs,
  Tab
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { getItemById } from "../data/items";
import { Item } from "../types/item";
import { ContactForm } from "../components/contact-form";

export const ItemDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [item, setItem] = React.useState<Item | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeImage, setActiveImage] = React.useState<string>("");
  const [selectedTab, setSelectedTab] = React.useState<string>("details");

  React.useEffect(() => {
    const loadItem = async () => {
      try {
        const loadedItem = await getItemById(id);
        if (loadedItem) {
          setItem(loadedItem);
          setActiveImage(loadedItem.images[0]);
        } else {
          // Item not found
          history.push("/catalog");
        }
      } catch (error) {
        console.error("Failed to load item:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    loadItem();
  }, [id, history]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-6 bg-default-200 rounded w-1/4 mb-8"></div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-default-200 h-96 w-full rounded mb-4"></div>
              <div className="flex gap-2 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-default-200 h-20 w-20 rounded"></div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="h-8 bg-default-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-default-200 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-default-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-default-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-default-200 rounded w-3/4 mb-6"></div>
              <div className="h-10 bg-default-200 rounded w-full mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="font-playfair text-2xl font-semibold mb-4">Item Not Found</h2>
        <p className="text-default-600 mb-6">
          The item you're looking for doesn't exist or has been removed.
        </p>
        <Button
          color="primary"
          onPress={() => history.push("/catalog")}
          startContent={<Icon icon="lucide:arrow-left" />}
        >
          Back to Catalog
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <Breadcrumbs className="mb-8">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/catalog">Catalog</BreadcrumbItem>
        <BreadcrumbItem>{item.name}</BreadcrumbItem>
      </Breadcrumbs>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Images */}
        <div className="lg:w-2/3">
          <Card className="mb-4 overflow-hidden">
            <img
              src={activeImage}
              alt={item.name}
              className="w-full h-auto object-contain aspect-[4/3]"
            />
          </Card>
          
          <div className="overflow-x-auto hide-scrollbar pb-2">
            <div className="flex gap-2 min-w-max">
              {item.images.map((image, index) => (
                <Button
                  key={index}
                  isIconOnly
                  variant={image === activeImage ? "flat" : "light"}
                  color={image === activeImage ? "primary" : "default"}
                  className="min-w-[80px] h-20 p-0 overflow-hidden"
                  onPress={() => setActiveImage(image)}
                >
                  <img
                    src={image}
                    alt={`${item.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:w-1/3">
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <h1 className="font-playfair text-3xl font-bold">{item.name}</h1>
              {item.featured && (
                <Chip color="warning" variant="flat" startContent={<Icon icon="lucide:star" />}>
                  Featured
                </Chip>
              )}
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Chip color="primary" variant="flat">
                {item.storeLocation}
              </Chip>
              <p className="text-2xl font-semibold text-primary">
                {formatPrice(item.price)}
              </p>
            </div>
            
            <Divider className="my-4" />
            
            <div className="relative">
              <div className="overflow-x-auto hide-scrollbar pb-1">
                <Tabs 
                  aria-label="Item information" 
                  selectedKey={selectedTab}
                  onSelectionChange={(key) => setSelectedTab(key as string)}
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6 flex-nowrap min-w-max",
                    cursor: "w-full bg-primary",
                    tab: "max-w-fit px-0 h-12",
                    base: "w-full",
                  }}
                >
                  <Tab 
                    key="details" 
                    title={
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Icon icon="lucide:info" />
                        <span>Details</span>
                      </div>
                    }
                  >
                    <div className="py-4 space-y-4">
                      <p className="text-default-600">{item.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-default-500">Category</p>
                          <p className="font-medium">{item.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-default-500">Period</p>
                          <p className="font-medium">{item.period}</p>
                        </div>
                        <div>
                          <p className="text-sm text-default-500">Condition</p>
                          <p className="font-medium">{item.condition}</p>
                        </div>
                        <div>
                          <p className="text-sm text-default-500">Dimensions</p>
                          <p className="font-medium">{item.dimensions}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm text-default-500">Item ID</p>
                        <p className="font-medium">{item.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </Tab>
                  <Tab 
                    key="inquire" 
                    title={
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <Icon icon="lucide:mail" />
                        <span>Inquire</span>
                      </div>
                    }
                  >
                    <div className="py-4">
                      <ContactForm itemName={item.name} itemId={item.id} />
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button
              color="primary"
              size="lg"
              className="w-full"
              startContent={<Icon icon="lucide:mail" />}
              onPress={() => setSelectedTab("inquire")}
            >
              Inquire About This Item
            </Button>
            <Button
              color="default"
              variant="flat"
              className="w-full"
              startContent={<Icon icon="lucide:arrow-left" />}
              onPress={() => history.push("/catalog")}
            >
              Back to Catalog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
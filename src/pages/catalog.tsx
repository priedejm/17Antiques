import React from "react";
import { 
  Tabs, 
  Tab, 
  Input, 
  Select, 
  SelectItem, 
  Chip, 
  Button,
  Pagination,
  Card,
  CardBody
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ItemCard } from "../components/item-card";
import { getItems, getItemsByStore } from "../data/items";
import { Item, StoreLocation } from "../types/item";

export const Catalog: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedStore, setSelectedStore] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("all");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12; // Increased for better masonry effect

  // Extract unique categories and periods for filters
  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
    return ["all", ...uniqueCategories];
  }, [items]);

  const periods = React.useMemo(() => {
    const uniquePeriods = Array.from(new Set(items.map(item => item.period)));
    return ["all", ...uniquePeriods];
  }, [items]);

  React.useEffect(() => {
    const loadItems = async () => {
      try {
        let loadedItems: Item[];
        
        if (selectedStore === "all") {
          loadedItems = await getItems();
        } else if (selectedStore === StoreLocation.SOUTH_ANTIQUES) {
          loadedItems = await getItemsByStore(StoreLocation.SOUTH_ANTIQUES);
        } else {
          loadedItems = await getItemsByStore(StoreLocation.WINDERMERE);
        }
        
        setItems(loadedItems);
      } catch (error) {
        console.error("Failed to load items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    loadItems();
  }, [selectedStore]);

  React.useEffect(() => {
    // Ensure the page is scrolled to the top when component mounts
    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    let result = [...items];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item => 
          item.name.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.period.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(item => item.category === selectedCategory);
    }
    
    // Apply period filter
    if (selectedPeriod !== "all") {
      result = result.filter(item => item.period === selectedPeriod);
    }
    
    setFilteredItems(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [items, searchQuery, selectedCategory, selectedPeriod]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStoreChange = (key: React.Key) => {
    setSelectedStore(key as string);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPeriod("all");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold mb-4">Our Catalog</h1>
        <p className="text-default-600 max-w-2xl mx-auto">
          Browse our extensive collection of fine antiques and collectibles from both of our locations.
        </p>
      </div>

      {/* Store Tabs */}
      <div className="mb-8 relative">
        <div className="overflow-x-auto hide-scrollbar pb-1">
          <Tabs 
            aria-label="Store Locations" 
            selectedKey={selectedStore} 
            onSelectionChange={handleStoreChange}
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
              key="all" 
              title={
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Icon icon="lucide:store" />
                  <span>All Locations</span>
                </div>
              }
            />
            <Tab 
              key={StoreLocation.SOUTH_ANTIQUES} 
              title={
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Icon icon="lucide:landmark" />
                  <span>17 South Antiques</span>
                </div>
              }
            />
            <Tab 
              key={StoreLocation.WINDERMERE} 
              title={
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Icon icon="lucide:building" />
                  <span>Antiques S Windermere</span>
                </div>
              }
            />
          </Tabs>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <Card>
          <CardBody>
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                startContent={<Icon icon="lucide:search" />}
                isClearable
                className="w-full md:w-1/3"
              />
              
              <Select
                label="Category"
                placeholder="Category"
                selectedKeys={selectedCategory !== "all" ? [selectedCategory] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  setSelectedCategory(selected || "all");
                }}
                className="w-full md:w-1/4"
                classNames={{
                  value: "capitalize",
                  trigger: "min-h-unit-10"
                }}
              >
                <SelectItem key="all" value="all">
                  All Categories
                </SelectItem>
                {categories.filter(category => category !== "all").map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </Select>
              
              <Select
                label="Period"
                placeholder="Period"
                selectedKeys={selectedPeriod !== "all" ? [selectedPeriod] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0] as string;
                  setSelectedPeriod(selected || "all");
                }}
                className="w-full md:w-1/4"
                classNames={{
                  value: "capitalize",
                  trigger: "min-h-unit-10"
                }}
              >
                <SelectItem key="all" value="all">
                  All Periods
                </SelectItem>
                {periods.filter(period => period !== "all").map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </Select>
              
              <Button
                color="default"
                variant="flat"
                onPress={handleClearFilters}
                startContent={<Icon icon="lucide:x" />}
                className="w-full md:w-auto"
              >
                Clear Filters
              </Button>
            </div>
            
            {/* Active filters */}
            {(selectedCategory !== "all" || selectedPeriod !== "all" || searchQuery) && (
              <div className="flex flex-wrap gap-2 mt-4">
                {searchQuery && (
                  <Chip
                    onClose={() => setSearchQuery("")}
                    variant="flat"
                    color="primary"
                  >
                    Search: {searchQuery}
                  </Chip>
                )}
                
                {selectedCategory !== "all" && (
                  <Chip
                    onClose={() => setSelectedCategory("all")}
                    variant="flat"
                    color="primary"
                  >
                    Category: {selectedCategory}
                  </Chip>
                )}
                
                {selectedPeriod !== "all" && (
                  <Chip
                    onClose={() => setSelectedPeriod("all")}
                    variant="flat"
                    color="primary"
                  >
                    Period: {selectedPeriod}
                  </Chip>
                )}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* Results count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-default-600">
          Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      {/* True Masonry Layout using CSS columns */}
      {isLoading ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <Card key={i} className="w-full mb-6 break-inside-avoid">
              <CardBody className="flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center space-y-4 w-full">
                  <div 
                    className="bg-default-200 w-full rounded"
                    style={{
                      height: `${200 + Math.random() * 100}px` // Random height for loading skeleton
                    }}
                  ></div>
                  <div className="h-4 bg-default-200 rounded w-3/4"></div>
                  <div className="h-4 bg-default-200 rounded w-1/2"></div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-4 text-default-400">
            <Icon icon="lucide:search-x" className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="font-playfair text-2xl font-semibold mb-2">No Items Found</h3>
          <p className="text-default-600 mb-6">
            We couldn't find any items matching your current filters.
          </p>
          <Button
            color="primary"
            variant="flat"
            onPress={handleClearFilters}
            startContent={<Icon icon="lucide:refresh-cw" />}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 mb-8">
            {currentItems.map((item) => (
              <div key={item.id} className="mb-6 break-inside-avoid">
                <ItemCard item={item} />
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={setCurrentPage}
                color="primary"
                showControls
              />
            </div>
          )}
        </>
      )}

    </div>
  );
};
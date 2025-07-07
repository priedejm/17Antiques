import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Chip, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { getItems, deleteItem } from "../data/items";
import { Item, StoreLocation, CategoryItem, PeriodItem, ConditionItem } from "../types/item";
import { MetadataManager } from "../components/metadata-manager";
import { 
  getCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory,
  getPeriods,
  addPeriod,
  updatePeriod,
  deletePeriod,
  getConditions,
  addCondition,
  updateCondition,
  deleteCondition
} from "../data/metadata";

export const AdminDashboard: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedStore, setSelectedStore] = React.useState<string>("all");
  const [itemToDelete, setItemToDelete] = React.useState<Item | null>(null);
  const [activeTab, setActiveTab] = React.useState<string>("items");
  
  const [categories, setCategories] = React.useState<CategoryItem[]>([]);
  const [periods, setPeriods] = React.useState<PeriodItem[]>([]);
  const [conditions, setConditions] = React.useState<ConditionItem[]>([]);
  const [isLoadingMetadata, setIsLoadingMetadata] = React.useState(true);
  
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  React.useEffect(() => {
    const loadItems = async () => {
      try {
        const loadedItems = await getItems();
        setItems(loadedItems);
      } catch (error) {
        console.error("Failed to load items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);
  
  React.useEffect(() => {
    const loadMetadata = async () => {
      setIsLoadingMetadata(true);
      try {
        const [categoriesData, periodsData, conditionsData] = await Promise.all([
          getCategories(),
          getPeriods(),
          getConditions()
        ]);
        
        setCategories(categoriesData);
        setPeriods(periodsData);
        setConditions(conditionsData);
      } catch (error) {
        console.error("Failed to load metadata:", error);
      } finally {
        setIsLoadingMetadata(false);
      }
    };
    
    if (activeTab === "metadata") {
      loadMetadata();
    }
  }, [activeTab]);

  // Sort items alphabetically by name
  const filteredItems = React.useMemo(() => {
    let filtered = items;
    
    if (selectedStore !== "all") {
      filtered = items.filter(item => item.storeLocation === selectedStore);
    }
    
    // Sort alphabetically by name (case-insensitive)
    return filtered.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
  }, [items, selectedStore]);

  const handleStoreChange = (key: React.Key) => {
    setSelectedStore(key as string);
  };

  const confirmDelete = (item: Item) => {
    setItemToDelete(item);
    onOpen();
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      const success = await deleteItem(itemToDelete.id);
      
      if (success) {
        setItems(items.filter(item => item.id !== itemToDelete.id));
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
      onClose();
      setItemToDelete(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const handleAddCategory = async (name: string) => {
    const newCategory = await addCategory(name);
    setCategories([...categories, newCategory]);
  };
  
  const handleUpdateCategory = async (id: string, name: string) => {
    const updatedCategory = await updateCategory(id, name);
    if (updatedCategory) {
      setCategories(categories.map(c => c.id === id ? updatedCategory : c));
    }
  };
  
  const handleDeleteCategory = async (id: string) => {
    const success = await deleteCategory(id);
    if (success) {
      setCategories(categories.filter(c => c.id !== id));
    }
  };
  
  const handleAddPeriod = async (name: string) => {
    const newPeriod = await addPeriod(name);
    setPeriods([...periods, newPeriod]);
  };
  
  const handleUpdatePeriod = async (id: string, name: string) => {
    const updatedPeriod = await updatePeriod(id, name);
    if (updatedPeriod) {
      setPeriods(periods.map(p => p.id === id ? updatedPeriod : p));
    }
  };
  
  const handleDeletePeriod = async (id: string) => {
    const success = await deletePeriod(id);
    if (success) {
      setPeriods(periods.filter(p => p.id !== id));
    }
  };
  
  const handleAddCondition = async (name: string) => {
    const newCondition = await addCondition(name);
    setConditions([...conditions, newCondition]);
  };
  
  const handleUpdateCondition = async (id: string, name: string) => {
    const updatedCondition = await updateCondition(id, name);
    if (updatedCondition) {
      setConditions(conditions.map(c => c.id === id ? updatedCondition : c));
    }
  };
  
  const handleDeleteCondition = async (id: string) => {
    const success = await deleteCondition(id);
    if (success) {
      setConditions(conditions.filter(c => c.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-default-600">
            Manage your antique catalog items and metadata.
          </p>
        </div>
        
        <Button
          as={RouterLink}
          to="/admin/items/new"
          color="primary"
          startContent={<Icon icon="lucide:plus" />}
        >
          Add New Item
        </Button>
      </div>
      
      <Tabs 
        aria-label="Dashboard Sections" 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key as string)}
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-2 md:gap-6 flex-wrap",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12 text-sm md:text-base",
        }}
      >
        <Tab 
          key="items" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:package" />
              <span>Items</span>
            </div>
          }
        >
          <div className="relative">
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
                      <Chip size="sm" variant="flat">{items.length}</Chip>
                    </div>
                  }
                />
                <Tab 
                  key={StoreLocation.SOUTH_ANTIQUES} 
                  title={
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Icon icon="lucide:landmark" />
                      <span>17 South Antiques</span>
                      <Chip size="sm" variant="flat">
                        {items.filter(item => item.storeLocation === StoreLocation.SOUTH_ANTIQUES).length}
                      </Chip>
                    </div>
                  }
                />
                <Tab 
                  key={StoreLocation.WINDERMERE} 
                  title={
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <Icon icon="lucide:building" />
                      <span>Antiques S Windermere</span>
                      <Chip size="sm" variant="flat">
                        {items.filter(item => item.storeLocation === StoreLocation.WINDERMERE).length}
                      </Chip>
                    </div>
                  }
                />
              </Tabs>
            </div>
          </div>
          
          <Card className="mt-6">
            <CardHeader className="flex justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedStore === "all" ? "All Items" : selectedStore}
                </h2>
                <p className="text-default-500 text-sm">
                  Items sorted alphabetically by name
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mb-4 text-default-400">
                    <Icon icon="lucide:package-x" className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Items Found</h3>
                  <p className="text-default-600 mb-6">
                    There are no items in this location yet.
                  </p>
                  <Button
                    as={RouterLink}
                    to="/admin/items/new"
                    color="primary"
                    variant="flat"
                    startContent={<Icon icon="lucide:plus" />}
                  >
                    Add New Item
                  </Button>
                </div>
              ) : (
                <div className="responsive-table">
                  <Table removeWrapper aria-label="Items table">
                    <TableHeader>
                      <TableColumn>
                        <div className="flex items-center gap-2">
                          ITEM
                          <Icon icon="lucide:arrow-up-a-z" className="w-4 h-4 text-default-400" />
                        </div>
                      </TableColumn>
                      <TableColumn>CATEGORY</TableColumn>
                      <TableColumn>PRICE</TableColumn>
                      <TableColumn>LOCATION</TableColumn>
                      <TableColumn>UPDATED</TableColumn>
                      <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {filteredItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-default-500 text-xs">{item.period}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell>{formatPrice(item.price)}</TableCell>
                          <TableCell>
                            <Chip size="sm" variant="flat" color="primary">
                              {item.storeLocation === StoreLocation.SOUTH_ANTIQUES ? "17 South" : "Windermere"}
                            </Chip>
                          </TableCell>
                          <TableCell>{formatDate(item.updatedAt)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Dropdown>
                                <DropdownTrigger>
                                  <Button 
                                    isIconOnly 
                                    variant="light" 
                                    size="sm"
                                  >
                                    <Icon icon="lucide:more-vertical" />
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Item actions">
                                  <DropdownItem
                                    as={RouterLink}
                                    to={`/catalog/${item.id}`}
                                    startContent={<Icon icon="lucide:eye" />}
                                  >
                                    View
                                  </DropdownItem>
                                  <DropdownItem
                                    as={RouterLink}
                                    to={`/admin/items/${item.id}/edit`}
                                    startContent={<Icon icon="lucide:edit" />}
                                  >
                                    Edit
                                  </DropdownItem>
                                  <DropdownItem
                                    startContent={<Icon icon="lucide:trash" className="text-danger" />}
                                    className="text-danger"
                                    onPress={() => confirmDelete(item)}
                                  >
                                    Delete
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        
        <Tab 
          key="metadata" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:settings" />
              <span>Metadata</span>
            </div>
          }
        >
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetadataManager
              title="Categories"
              items={categories}
              isLoading={isLoadingMetadata}
              onAdd={handleAddCategory}
              onUpdate={handleUpdateCategory}
              onDelete={handleDeleteCategory}
            />
            
            <MetadataManager
              title="Periods"
              items={periods}
              isLoading={isLoadingMetadata}
              onAdd={handleAddPeriod}
              onUpdate={handleUpdatePeriod}
              onDelete={handleDeletePeriod}
            />
            
            <MetadataManager
              title="Conditions"
              items={conditions}
              isLoading={isLoadingMetadata}
              onAdd={handleAddCondition}
              onUpdate={handleUpdateCondition}
              onDelete={handleDeleteCondition}
            />
          </div>
        </Tab>
      </Tabs>
      
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirm Deletion</ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete <strong>{itemToDelete?.name}</strong>?
                This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Cancel
              </Button>
              <Button color="danger" onPress={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>
    </div>
  );
};
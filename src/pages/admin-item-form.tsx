import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { 
  Button, 
  Card, 
  CardBody, 
  CardHeader, 
  Divider, 
  Input, 
  Textarea, 
  Select, 
  SelectItem,
  Switch,
  Breadcrumbs,
  BreadcrumbItem
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { getItemById, createItem, updateItem } from "../data/items";
import { Item, ItemFormData, StoreLocation, CategoryItem, PeriodItem, ConditionItem } from "../types/item";
import { ImageUpload } from "../components/image-upload";
import { getCategories, getPeriods, getConditions } from "../data/metadata";

export const AdminItemForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const isEditMode = !!id;
  
  const [formData, setFormData] = React.useState<ItemFormData>({
    name: "",
    description: "",
    price: 0,
    category: "",
    period: "",
    condition: "",
    dimensions: "",
    images: [],
    featured: false,
    storeLocation: StoreLocation.SOUTH_ANTIQUES
  });
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const [categories, setCategories] = React.useState<CategoryItem[]>([]);
  const [periods, setPeriods] = React.useState<PeriodItem[]>([]);
  const [conditions, setConditions] = React.useState<ConditionItem[]>([]);
  const [isLoadingMetadata, setIsLoadingMetadata] = React.useState(true);

  React.useEffect(() => {
    const loadItem = async () => {
      if (!isEditMode) return;
      
      try {
        setIsLoading(true);
        const item = await getItemById(id);
        
        if (item) {
          setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            period: item.period,
            condition: item.condition,
            dimensions: item.dimensions,
            images: item.images,
            featured: item.featured,
            storeLocation: item.storeLocation
          });
        } else {
          history.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Failed to load item:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, [id, isEditMode, history]);

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
    
    loadMetadata();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const handleStoreChange = (keys: any) => {
    const selected = Array.from(keys)[0] as StoreLocation;
    
    if (selected) {
      setFormData(prev => ({
        ...prev,
        storeLocation: selected
      }));
    }
  };

  const handleCategoryChange = (keys: any) => {
    const selected = Array.from(keys)[0] as string;
    
    if (selected) {
      const category = categories.find(c => c.id === selected);
      if (category) {
        setFormData(prev => ({
          ...prev,
          category: category.name
        }));
        
        if (errors.category) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.category;
            return newErrors;
          });
        }
      }
    }
  };

  const handlePeriodChange = (keys: any) => {
    const selected = Array.from(keys)[0] as string;
    
    if (selected) {
      const period = periods.find(p => p.id === selected);
      if (period) {
        setFormData(prev => ({
          ...prev,
          period: period.name
        }));
        
        if (errors.period) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.period;
            return newErrors;
          });
        }
      }
    }
  };

  const handleConditionChange = (keys: any) => {
    const selected = Array.from(keys)[0] as string;
    
    if (selected) {
      const condition = conditions.find(c => c.id === selected);
      if (condition) {
        setFormData(prev => ({
          ...prev,
          condition: condition.name
        }));
        
        if (errors.condition) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.condition;
            return newErrors;
          });
        }
      }
    }
  };

  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
    
    if (errors.images) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.images;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    
    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }
    
    if (!formData.period.trim()) {
      newErrors.period = "Period is required";
    }
    
    if (!formData.condition.trim()) {
      newErrors.condition = "Condition is required";
    }
    
    if (formData.images.length === 0) {
      newErrors.images = "At least one image is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSaving(true);
    
    try {
      if (isEditMode && id) {
        await updateItem(id, formData);
      } else {
        await createItem(formData);
      }
      
      history.push("/admin/dashboard");
    } catch (error) {
      console.error("Failed to save item:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedCategoryId = React.useMemo(() => {
    const category = categories.find(c => c.name === formData.category);
    return category ? category.id : "";
  }, [categories, formData.category]);
  
  const selectedPeriodId = React.useMemo(() => {
    const period = periods.find(p => p.name === formData.period);
    return period ? period.id : "";
  }, [periods, formData.period]);
  
  const selectedConditionId = React.useMemo(() => {
    const condition = conditions.find(c => c.name === formData.condition);
    return condition ? condition.id : "";
  }, [conditions, formData.condition]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs className="mb-6">
        <BreadcrumbItem href="/admin/dashboard">Dashboard</BreadcrumbItem>
        <BreadcrumbItem>{isEditMode ? "Edit Item" : "New Item"}</BreadcrumbItem>
      </Breadcrumbs>
      
      <Card>
        <CardHeader className="flex flex-col gap-1">
          <h1 className="font-playfair text-2xl font-bold">
            {isEditMode ? "Edit Item" : "Add New Item"}
          </h1>
          <p className="text-default-500">
            {isEditMode 
              ? "Update the information for this item in your catalog." 
              : "Fill in the details to add a new item to your catalog."}
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <Input
                  label="Item Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="bordered"
                  isRequired
                  isInvalid={!!errors.name}
                  errorMessage={errors.name}
                />
                
                <Textarea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  variant="bordered"
                  minRows={4}
                  isRequired
                  isInvalid={!!errors.description}
                  errorMessage={errors.description}
                />
                
                <Input
                  label="Price ($)"
                  name="price"
                  type="number"
                  value={formData.price.toString()}
                  onChange={handleChange}
                  variant="bordered"
                  startContent={<div className="pointer-events-none">$</div>}
                  isRequired
                  isInvalid={!!errors.price}
                  errorMessage={errors.price}
                />
                
                <Select
                  label="Category"
                  placeholder="Select a category"
                  selectedKeys={selectedCategoryId ? [selectedCategoryId] : []}
                  onSelectionChange={handleCategoryChange}
                  variant="bordered"
                  isRequired
                  isLoading={isLoadingMetadata}
                  isInvalid={!!errors.category}
                  errorMessage={errors.category}
                  classNames={{
                    value: "capitalize"
                  }}
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </Select>
                
                <Select
                  label="Period"
                  placeholder="Select a period"
                  selectedKeys={selectedPeriodId ? [selectedPeriodId] : []}
                  onSelectionChange={handlePeriodChange}
                  variant="bordered"
                  isRequired
                  isLoading={isLoadingMetadata}
                  isInvalid={!!errors.period}
                  errorMessage={errors.period}
                  classNames={{
                    value: "capitalize"
                  }}
                >
                  {periods.map((period) => (
                    <SelectItem key={period.id} value={period.id}>
                      {period.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              
              <div className="space-y-6">
                <Select
                  label="Condition"
                  placeholder="Select a condition"
                  selectedKeys={selectedConditionId ? [selectedConditionId] : []}
                  onSelectionChange={handleConditionChange}
                  variant="bordered"
                  isRequired
                  isLoading={isLoadingMetadata}
                  isInvalid={!!errors.condition}
                  errorMessage={errors.condition}
                  classNames={{
                    value: "capitalize"
                  }}
                >
                  {conditions.map((condition) => (
                    <SelectItem key={condition.id} value={condition.id}>
                      {condition.name}
                    </SelectItem>
                  ))}
                </Select>
                
                <Input
                  label="Dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  variant="bordered"
                  placeholder="e.g., 24&quot;W x 36&quot;H x 18&quot;D"
                />
                
                <Select
                  label="Store Location"
                  selectedKeys={[formData.storeLocation]}
                  onSelectionChange={handleStoreChange}
                  variant="bordered"
                  isRequired
                >
                  <SelectItem key={StoreLocation.SOUTH_ANTIQUES} value={StoreLocation.SOUTH_ANTIQUES}>
                    17 South Antiques
                  </SelectItem>
                  <SelectItem key={StoreLocation.WINDERMERE} value={StoreLocation.WINDERMERE}>
                    Antiques S Windermere
                  </SelectItem>
                </Select>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-medium">Featured Item</p>
                    <p className="text-default-500 text-sm">
                      Featured items appear on the homepage
                    </p>
                  </div>
                  <Switch
                    isSelected={formData.featured}
                    onValueChange={handleSwitchChange}
                    color="primary"
                  />
                </div>
                
                <div>
                  <p className="text-medium mb-2">Item Images</p>
                  <ImageUpload 
                    images={formData.images} 
                    onChange={handleImagesChange} 
                  />
                  {errors.images && (
                    <p className="text-danger text-sm mt-1">{errors.images}</p>
                  )}
                </div>
              </div>
            </div>
            
            <Divider className="my-6" />
            
            <div className="flex justify-end gap-3">
              <Button
                variant="flat"
                onPress={() => history.push("/admin/dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={isSaving}
                startContent={!isSaving && <Icon icon="lucide:save" />}
              >
                {isSaving ? "Saving..." : isEditMode ? "Update Item" : "Add Item"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
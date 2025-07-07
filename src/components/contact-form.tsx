import React from "react";
import { Button, Input, Textarea, Card, CardBody, CardHeader, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";

interface ContactFormProps {
  itemName?: string;
  itemId?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ itemName, itemId }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: itemName ? `I'm interested in the ${itemName} (Item #${itemId?.slice(0, 8)})` : "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col gap-1">
        <h3 className="font-playfair text-xl font-semibold">
          {itemName ? `Inquire About ${itemName}` : "Contact Us"}
        </h3>
        <p className="text-default-500 text-sm">
          {itemName 
            ? "Fill out the form below and we'll get back to you about this item."
            : "Have questions? We're here to help. Send us a message and we'll respond as soon as possible."}
        </p>
      </CardHeader>
      <Divider />
      <CardBody>
        {isSubmitted ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="rounded-full bg-success-100 p-3 mb-4">
              <Icon icon="lucide:check" className="text-success h-8 w-8" />
            </div>
            <h4 className="font-playfair text-xl font-semibold mb-2">Thank You!</h4>
            <p className="text-default-600 mb-6">
              Your message has been sent successfully. We'll get back to you shortly.
            </p>
            <Button
              color="primary"
              variant="flat"
              onPress={() => setIsSubmitted(false)}
            >
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="bordered"
              isRequired
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              variant="bordered"
              isRequired
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              variant="bordered"
            />
            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              variant="bordered"
              minRows={4}
              isRequired
            />
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={isSubmitting}
              startContent={!isSubmitting && <Icon icon="lucide:send" />}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        )}
      </CardBody>
    </Card>
  );
};
import React from "react";
import {
  Search,
  Heart,
  User,
  Menu,
  X,
  Filter,
  Package,
  ZoomIn,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  ShoppingCart,
  Shield,
  CreditCard,
  Instagram,
  Facebook,
  Twitter,
  Check,
  MapPin,
  TabletSmartphone,
  Camera,
  LaptopMinimal,
  Gamepad2,
  Watch,
  Unplug,
  Trash2,
  Loader2,
  ChevronDown,
  Share2,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Home,
  RotateCcw,
  MessageCircle,
  type LucideProps,
} from "lucide-react";

// Define icon component type
export type IconComponent = React.FC<LucideProps>;

// Individual icon components for easy use

// Specific icon components for common use cases
export const SearchIcon: IconComponent = (props) => <Search {...props} />;
export const ShoppingBagIcon: IconComponent = (props) => (
  <ShoppingCart {...props} />
);
export const HeartIcon: IconComponent = (props) => <Heart {...props} />;
export const UserIcon: IconComponent = (props) => <User {...props} />;
export const MenuIcon: IconComponent = (props) => <Menu {...props} />;
export const CloseIcon: IconComponent = (props) => <X {...props} />;
export const FilterIcon: IconComponent = (props) => <Filter {...props} />;
export const PackageIcon: IconComponent = (props) => <Package {...props} />;
export const ZoomInIcon: IconComponent = (props) => <ZoomIn {...props} />;
export const ChevronRightIcon: IconComponent = (props) => (
  <ChevronRight {...props} />
);
export const ChevronLeftIcon: IconComponent = (props) => (
  <ChevronLeft {...props} />
);
export const EyeIcon: IconComponent = (props) => <Eye {...props} />;
export const EyeOffIcon: IconComponent = (props) => <EyeOff {...props} />;
export const ShoppingCartIcon: IconComponent = (props) => (
  <ShoppingCart {...props} />
);
export const ShieldIcon: IconComponent = (props) => <Shield {...props} />;
export const CreditCardIcon: IconComponent = (props) => (
  <CreditCard {...props} />
);
export const CheckIcon: IconComponent = (props) => <Check {...props} />;
export const MapPinIcon: IconComponent = (props) => <MapPin {...props} />;
export const InstagramIcon: IconComponent = (props) => <Instagram {...props} />;
export const FacebookIcon: IconComponent = (props) => <Facebook {...props} />;
export const TwitterIcon: IconComponent = (props) => <Twitter {...props} />;
export const StarIcon: IconComponent = (props) => <Star {...props} />;

// Category Icons
export const TabletSmartphoneIcon: IconComponent = (props) => (
  <TabletSmartphone {...props} />
);
export const CameraIcon: IconComponent = (props) => <Camera {...props} />;
export const LaptopMinimalIcon: IconComponent = (props) => (
  <LaptopMinimal {...props} />
);
export const Gamepad2Icon: IconComponent = (props) => <Gamepad2 {...props} />;
export const WatchIcon: IconComponent = (props) => <Watch {...props} />;
export const UnplugIcon: IconComponent = (props) => <Unplug {...props} />;
export const TrashIcon: IconComponent = (props) => <Trash2 {...props} />;
export const LoaderIcon: IconComponent = (props) => <Loader2 {...props} />;
export const ChevronDownIcon: IconComponent = (props) => (
  <ChevronDown {...props} />
);
export const ShareIcon: IconComponent = (props) => <Share2 {...props} />;
export const ClockIcon: IconComponent = (props) => <Clock {...props} />;

// Error and notification icons
export const CheckCircleIcon: IconComponent = (props) => (
  <CheckCircle {...props} />
);
export const XCircleIcon: IconComponent = (props) => <XCircle {...props} />;
export const ExclamationTriangleIcon: IconComponent = (props) => (
  <AlertTriangle {...props} />
);
export const InformationCircleIcon: IconComponent = (props) => (
  <Info {...props} />
);
export const XMarkIcon: IconComponent = (props) => <X {...props} />;
export const HomeIcon: IconComponent = (props) => <Home {...props} />;
export const ArrowPathIcon: IconComponent = (props) => <RotateCcw {...props} />;
export const ChatBubbleLeftRightIcon: IconComponent = (props) => (
  <MessageCircle {...props} />
);
export const MagnifyingGlassIcon: IconComponent = (props) => (
  <Search {...props} />
);

// Export all icons as default
export default {
  SearchIcon,
  ShoppingBagIcon,
  HeartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  FilterIcon,
  PackageIcon,
  ZoomInIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  EyeIcon,
  EyeOffIcon,
  ShoppingCartIcon,
  ShieldIcon,
  CreditCardIcon,
  CheckIcon,
  MapPinIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
  StarIcon,
  TabletSmartphoneIcon,
  CameraIcon,
  LaptopMinimalIcon,
  Gamepad2Icon,
  WatchIcon,
  UnplugIcon,
  TrashIcon,
  LoaderIcon,
  ChevronDownIcon,
  ShareIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
  HomeIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
};

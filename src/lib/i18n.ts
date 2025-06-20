import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        products: "Products",
        categories: "Categories",
        about: "About",
        contact: "Contact",
        cart: "Cart",
        wishlist: "Wishlist",
        account: "Account",
        search: "Search products...",
        language: "Language",
      },

      // Hero Section
      hero: {
        slides: {
          headphones: {
            title: "Noise Cancelling",
            subtitle: "Headphone",
            description:
              "Bose Over-Ear Headphones\nWifi, Voice Assistant,\nLow Latency Game Mode",
            cta: "BUY NOW",
          },
          watch: {
            title: "Sport Water",
            subtitle: "Resistance Watch",
            description: "XOMIA\nSport Water\nResistance\nWatch",
            cta: "SHOP NOW",
          },
          camera: {
            title: "OKODO",
            subtitle: "HERO 11+ BLACK",
            description: "FROM\n$169",
            cta: "DISCOVER",
          },
        },
      },

      // Product Sections
      sections: {
        bestsellers: {
          title: "Best Sellers",
          description: "Most popular products loved by our customers",
          viewAll: "View All",
        },
        discount: {
          title: "🔥 Discount Products",
          description: "Limited time offers with amazing savings",
          viewAll: "View All",
        },
        new: {
          title: "✨ New Products",
          description: "Fresh arrivals and latest additions to our collection",
          viewAll: "View All",
        },
        related: {
          title: "Related Products",
        },
      },

      // Product Cards
      product: {
        addToCart: "Add to Cart",
        addToWishlist: "Add to Wishlist",
        outOfStock: "Out of Stock",
        buyNow: "Buy Now",
        new: "NEW",
        rating: "Rating",
        from: "from",
        brand: "Brand",
        quantity: "Quantity",
        description: "Description",
        specifications: "Specifications",
        viewAllProducts: "View All Products",
        viewAllDiscount: "View All Discount Products",
        viewAllNew: "View All New Products",
        noProductsAvailable: "No products available",
        variants: {
          select: "Select",
          inStock: "In Stock",
          lowStock: "Only {count} left in stock",
          color: "Color",
          size: "Size",
          storage: "Storage",
          memory: "Memory",
          style: "Style",
        },
      },

      // Product Categories (generic terms only)
      categories: {
        electronics: "Electronics",
        smartphones: "Smartphones",
        headphones: "Headphones",
        watches: "Watches",
        cameras: "Cameras",
        laptops: "Laptops",
        accessories: "Accessories",
      },

      // Side Products
      sideProducts: {
        playstation: "Sono Playgo 5",
        gaming: "OKODO",
        hero: "HERO 11+",
        black: "BLACK",
        discoverNow: "DISCOVER NOW",
      },

      // Cart
      cart: {
        title: "Shopping Cart",
        empty: "Your cart is empty",
        emptyDescription: "Add some products to get started",
        continueShopping: "Continue Shopping",
        proceedToCheckout: "Proceed to Checkout",
        remove: "Remove",
        quantity: "Quantity",
        subtotal: "Subtotal",
        discount: "Discount",
        shipping: "Shipping",
        total: "Total",
        itemTotal: "Item Total",
        itemsInCart: "items in your cart",
        itemInCart: "item in your cart",
      },

      // Checkout
      checkout: {
        title: "Checkout",
        description: "Review your order and complete your purchase",
        returnToCart: "Return to Cart",
        continueToPayment: "Continue to Payment",
        orderSummary: "Order Summary",
        customerInfo: "Customer Information",
        shippingAddress: "Shipping Address",
        shippingMethod: "Shipping Method",
        discountCode: "Discount Code",
        enterDiscountCode: "Enter discount code",
        apply: "Apply",
        edit: "Edit",
        verifiedCustomer: "Verified Customer",
        defaultAddress: "Default shipping address",
        freeShipping: "Free Shipping",
        regularShipping: "Regular Shipping",
        expressShipping: "Express Shipping",
        recommended: "RECOMMENDED",
        businessDays: "business days",
        qty: "Qty",
      },

      // Payment
      payment: {
        title: "Payment",
        description: "Complete your purchase securely",
        returnToCheckout: "Return to Checkout",
        completePayment: "Complete Payment",
        paymentMethod: "Payment Method",
        billingAddress: "Billing Address",
        sameAsShipping: "Same as shipping address",
        securePayment: "Secure Payment",
        securityNotice:
          "Your payment information is encrypted and secure. We never store your card details.",
        creditDebitCard: "Credit / Debit Card",
        creditCardDescription: "Secure payment with SSL encryption",
        cardNumber: "Card Number",
        expiryDate: "Expiry Date",
        cvv: "CVV",
        cardholderName: "Cardholder Name",
        abaPayDescription: "Scan to pay with ABA Mobile",
        edit: "Edit",
        sslSecured: "SSL Secured",
        trustedPayment: "Trusted Payment",
      },

      // Success
      success: {
        title: "Order Confirmed!",
        description:
          "Thank you for your purchase. Your order has been successfully placed and is being processed.",
        confirmationEmailSent: "Confirmation email sent",
        orderInformation: "Order Information",
        deliveryInformation: "Delivery Information",
        orderItems: "Order Items",
        orderNumber: "Order Number",
        orderDate: "Order Date",
        paymentMethod: "Payment Method",
        shippingMethod: "Shipping Method",
        totalAmount: "Total Amount",
        shippingAddress: "Shipping Address",
        estimatedDelivery: "Estimated Delivery",
        expressShipping: "Express shipping (1-3 business days)",
        whatsNext: "What's Next?",
        orderConfirmation:
          "Order Confirmation: You'll receive an email confirmation shortly with your order details.",
        processing:
          "Processing: Your order will be processed and prepared for shipment within 1 business day.",
        shipping:
          "Shipping: You'll receive tracking information once your order ships.",
        delivery: "Delivery: Your order will arrive by",
        trackYourOrder: "Track Your Order",
        continueShopping: "Continue Shopping",
        needHelp: "Need Help?",
        supportDescription:
          "If you have any questions about your order, our customer support team is here to help.",
        contactSupport: "Contact Support",
        helpCenter: "Help Center",
        creditCard: "Credit Card",
        qty: "Qty",
      },

      // Footer
      footer: {
        companyDescription:
          "Your trusted electronics store offering the latest technology products with fast delivery and excellent customer service.",
        paymentMethods: "Payment Methods",
        quickLinks: "Quick Links",
        customerService: "Customer Service",
        aboutUs: "About Us",
        contactUs: "Contact Us",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        shippingInfo: "Shipping Info",
        returns: "Returns",
        faq: "FAQ",
        support: "Support",
        myAccount: "My Account",
        orderHistory: "Order History",
        wishlist: "Wishlist",
        newsletter: "Newsletter",
        subscribeNewsletter:
          "Subscribe to our newsletter for updates and exclusive offers",
        enterEmail: "Enter your email",
        subscribe: "Subscribe",
        followUs: "Follow Us",
        address: "165-179 Forster Road City of Monash, Melbourne, Australia",
        copyright: "©2024 Copyright Elecxo - All rights reserved",
        language: "Language",
      },

      // Search
      search: {
        title: "Search",
        resultsFor: "Search results for",
        foundResults: "Showing {count} of {total} results",
        searching: "Searching...",
        enterQuery: "Enter a search term",
        searchHint: "Try searching for products, brands, or categories",
        noResults: "No results found",
        noResultsHint: "Try adjusting your search terms or clearing filters",
        suggestions: "Suggestions",
        recentSearches: "Recent Searches",
        clear: "Clear",
        clearFilters: "Clear Filters",
        noSuggestions: "No suggestions available",
        filters: "Filters",
        category: "Category",
        brand: "Brand",
        priceRange: "Price Range",
        inStock: "In Stock Only",
        onSale: "On Sale",
        showing: "Showing {count} results",
        sortRelevance: "Sort by Relevance",
        sortPriceLow: "Price: Low to High",
        sortPriceHigh: "Price: High to Low",
        sortNewest: "Newest First",
        sortRating: "Highest Rated",
      },

      // Common
      common: {
        loading: "Loading...",
        error: "Error",
        retry: "Retry",
        close: "Close",
        save: "Save",
        cancel: "Cancel",
        confirm: "Confirm",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        remove: "Remove",
        update: "Update",
        submit: "Submit",
        reset: "Reset",
      },

      // Error handling
      error: {
        pageNotFound: "Page Not Found",
        pageNotFoundDescription:
          "Sorry, the page you are looking for doesn't exist or has been moved.",
        goHome: "Go Home",
        browseProducts: "Browse Products",
        searchProducts: "Search for Products",
        searchPlaceholder: "What are you looking for?",
        popularCategories: "Popular Categories",
        suggestedProducts: "You Might Like These",
        somethingWentWrong: "Something Went Wrong",
        unexpectedError:
          "We encountered an unexpected error. Our team has been notified and we're working to fix it.",
        tryAgain: "Try Again",
        reportIssue: "Report Issue",
        errorId: "Error ID",
        errorDetails: "Error Details",
        persistentIssue:
          "If this problem persists, please contact our support team.",
      },

      // Toast notifications
      toast: {
        success: "Success",
        error: "Error",
        warning: "Warning",
        info: "Info",
        addedToCart: "Added to cart",
        removedFromCart: "Removed from cart",
        cartUpdated: "Cart updated",
        searchCompleted: "Search completed",
        searchFailed: "Search failed",
        networkError: "Network error",
        tryAgain: "Try again",
        dismiss: "Dismiss",
      },

      // Wishlist
      wishlist: {
        title: "My Wishlist",
        empty: "Your wishlist is empty",
        emptyDescription: "Start adding products you love to your wishlist",
        addToWishlist: "Add to Wishlist",
        removeFromWishlist: "Remove from Wishlist",
        addedToWishlist: "Added to Wishlist",
        removedFromWishlist: "Removed from Wishlist",
        alreadyInWishlist: "Already in Wishlist",
        moveToCart: "Move to Cart",
        movedToCart: "Moved to Cart",
        bulkMoveToCart: "Move All to Cart",
        bulkMovedToCart: "Items Moved to Cart",
        clearWishlist: "Clear Wishlist",
        cleared: "Wishlist Cleared",
        shareWishlist: "Share Wishlist",
        shared: "Wishlist Shared",
        shareLink: "Share Link",
        itemCount: "{{count}} item",
        itemCount_plural: "{{count}} items",
        addedOn: "Added on",
        selectAll: "Select All",
        selectNone: "Select None",
        selectedItems: "{{count}} selected",
        removeSelected: "Remove Selected",
        moveSelected: "Move Selected to Cart",
        continueShopping: "Continue Shopping",
        browseProducts: "Browse Products",
      },
    },
  },
  km: {
    translation: {
      // Navigation
      nav: {
        home: "ទំព័រដើម",
        products: "ផលិតផល",
        categories: "ប្រភេទ",
        about: "អំពីយើង",
        contact: "ទំនាក់ទំនង",
        cart: "កន្ត្រក់",
        wishlist: "បញ្ជីចង់បាន",
        account: "គណនី",
        search: "ស្វែងរកផលិតផល...",
        language: "ភាសា",
      },

      // Hero Section
      hero: {
        slides: {
          headphones: {
            title: "កាស់ស្តាប់",
            subtitle: "បំបាត់សំលេង",
            description:
              "កាស់ស្តាប់ Bose\nWifi, ជំនួយការសំលេង,\nរបៀបហ្គេមភ្លាមៗ",
            cta: "ទិញឥឡូវ",
          },
          watch: {
            title: "នាឡិកា",
            subtitle: "ធន់នឹងទឹក",
            description: "XOMIA\nនាឡិកា\nធន់នឹងទឹក\nកីឡា",
            cta: "ទិញឥឡូវ",
          },
          camera: {
            title: "OKODO",
            subtitle: "HERO 11+ ខ្មៅ",
            description: "ចាប់ពី\n$169",
            cta: "រកមើល",
          },
        },
      },

      // Product Sections
      sections: {
        bestsellers: {
          title: "លក់ដាច់បំផុត",
          description: "ផលិតផលពេញនិយមដែលអតិថិជនចូលចិត្ត",
          viewAll: "មើលទាំងអស់",
        },
        discount: {
          title: "🔥 ផលិតផលបញ្ចុះតម្លៃ",
          description: "ការផ្តល់ជូនពេលកំណត់ជាមួយការសន្សំអស្ចារ្យ",
          viewAll: "មើលទាំងអស់",
        },
        new: {
          title: "✨ ផលិតផលថ្មី",
          description: "ការមកដល់ថ្មីៗ និងការបន្ថែមចុងក្រោយទៅបណ្តុំរបស់យើង",
          viewAll: "មើលទាំងអស់",
        },
        related: {
          title: "ផលិតផលពាក់ព័ន្ធ",
        },
      },

      // Product Cards
      product: {
        addToCart: "បន្ថែមទៅកន្ត្រក់",
        addToWishlist: "បន្ថែមទៅបញ្ជីចង់បាន",
        outOfStock: "អស់ស្តុក",
        buyNow: "ទិញឥឡូវ",
        new: "ថ្មី",
        rating: "ការវាយតម្លៃ",
        from: "ចាប់ពី",
        brand: "ម៉ាក",
        quantity: "បរិមាណ",
        description: "ការពិពណ៌នា",
        specifications: "លក្ខណៈពិសេស",
        viewAllProducts: "មើលផលិតផលទាំងអស់",
        viewAllDiscount: "មើលផលិតផលបញ្ចុះតម្លៃទាំងអស់",
        viewAllNew: "មើលផលិតផលថ្មីទាំងអស់",
        noProductsAvailable: "មិនមានផលិតផល",
        variants: {
          select: "ជ្រើសរើស",
          inStock: "មានស្តុក",
          lowStock: "នៅសល់ {count} ក្នុងស្តុក",
          color: "ពណ៌",
          size: "ទំហំ",
          storage: "ការផ្ទុក",
          memory: "អង្គចងចាំ",
          style: "រចនាប័ទ្ម",
        },
      },

      // Product Categories (generic terms only)
      categories: {
        electronics: "គ្រឿងអេឡិចត្រូនិច",
        smartphones: "ទូរស័ព្ទស្មាតហ្វូន",
        headphones: "កាស់ស្តាប់",
        watches: "នាឡិកា",
        cameras: "ម៉ាស៊ីនថត",
        laptops: "កុំព្យូទ័រយួរដៃ",
        accessories: "គ្រឿងបន្លាស់",
      },

      // Side Products
      sideProducts: {
        playstation: "Sono Playgo 5",
        gaming: "OKODO",
        hero: "HERO 11+",
        black: "ខ្មៅ",
        discoverNow: "រកមើលឥឡូវ",
      },

      // Cart
      cart: {
        title: "កន្ត្រក់ទិញទំនិញ",
        empty: "កន្ត្រក់របស់អ្នកទទេ",
        emptyDescription: "បន្ថែមផលិតផលខ្លះដើម្បីចាប់ផ្តើម",
        continueShopping: "បន្តទិញទំនិញ",
        proceedToCheckout: "បន្តទៅការបង់ប្រាក់",
        remove: "យកចេញ",
        quantity: "បរិមាណ",
        subtotal: "សរុបរង",
        discount: "បញ្ចុះតម្លៃ",
        shipping: "ការដឹកជញ្ជូន",
        total: "សរុប",
        itemTotal: "សរុបទំនិញ",
        itemsInCart: "ទំនិញនៅក្នុងកន្ត្រក់របស់អ្នក",
        itemInCart: "ទំនិញនៅក្នុងកន្ត្រក់របស់អ្នក",
      },

      // Checkout
      checkout: {
        title: "ការបង់ប្រាក់",
        description: "ពិនិត្យមើលការបញ្ជាទិញរបស់អ្នក និងបញ្ចប់ការទិញ",
        returnToCart: "ត្រលប់ទៅកន្ត្រក់",
        continueToPayment: "បន្តទៅការបង់ប្រាក់",
        orderSummary: "សេចក្តីសង្ខេបការបញ្ជាទិញ",
        customerInfo: "ព័ត៌មានអតិថិជន",
        shippingAddress: "អាសយដ្ឋានដឹកជញ្ជូន",
        shippingMethod: "វិធីដឹកជញ្ជូន",
        discountCode: "កូដបញ្ចុះតម្លៃ",
        enterDiscountCode: "បញ្ចូលកូដបញ្ចុះតម្លៃ",
        apply: "អនុវត្ត",
        edit: "កែប្រែ",
        verifiedCustomer: "អតិថិជនដែលបានផ្ទៀងផ្ទាត់",
        defaultAddress: "អាសយដ្ឋានដឹកជញ្ជូនលំនាំដើម",
        freeShipping: "ដឹកជញ្ជូនឥតគិតថ្លៃ",
        regularShipping: "ដឹកជញ្ជូនធម្មតា",
        expressShipping: "ដឹកជញ្ជូនលឿន",
        recommended: "បានណែនាំ",
        businessDays: "ថ្ងៃធ្វើការ",
        qty: "បរិមាណ",
      },

      // Payment
      payment: {
        title: "ការបង់ប្រាក់",
        description: "បញ្ចប់ការទិញរបស់អ្នកដោយសុវត្ថិភាព",
        returnToCheckout: "ត្រលប់ទៅការបង់ប្រាក់",
        completePayment: "បញ្ចប់ការបង់ប្រាក់",
        paymentMethod: "វិធីបង់ប្រាក់",
        billingAddress: "អាសយដ្ឋានវិក្កយបត្រ",
        sameAsShipping: "ដូចអាសយដ្ឋានដឹកជញ្ជូន",
        securePayment: "ការបង់ប្រាក់សុវត្ថិភាព",
        securityNotice:
          "ព័ត៌មានការបង់ប្រាក់របស់អ្នកត្រូវបានអ៊ិនគ្រីប និងមានសុវត្ថិភាព។ យើងមិនដែលរក្សាទុកព័ត៌មានកាតរបស់អ្នកទេ។",
        creditDebitCard: "កាតឥណទាន / កាតឌេប៊ីត",
        creditCardDescription: "ការបង់ប្រាក់សុវត្ថិភាពជាមួយ SSL encryption",
        cardNumber: "លេខកាត",
        expiryDate: "កាលបរិច្ចេទផុតកំណត់",
        cvv: "CVV",
        cardholderName: "ឈ្មោះម្ចាស់កាត",
        abaPayDescription: "ស្កេនដើម្បីបង់ប្រាក់ជាមួយ ABA Mobile",
        edit: "កែប្រែ",
        sslSecured: "SSL សុវត្ថិភាព",
        trustedPayment: "ការបង់ប្រាក់ដែលអាចទុកចិត្តបាន",
      },

      // Success
      success: {
        title: "ការបញ្ជាទិញត្រូវបានបញ្ជាក់!",
        description:
          "សូមអរគុណសម្រាប់ការទិញរបស់អ្នក។ ការបញ្ជាទិញរបស់អ្នកត្រូវបានដាក់ដោយជោគជ័យ និងកំពុងត្រូវបានដំណើរការ។",
        confirmationEmailSent: "អ៊ីមែលបញ្ជាក់ត្រូវបានផ្ញើ",
        orderInformation: "ព័ត៌មានការបញ្ជាទិញ",
        deliveryInformation: "ព័ត៌មានការដឹកជញ្ជូន",
        orderItems: "ទំនិញបញ្ជាទិញ",
        orderNumber: "លេខការបញ្ជាទិញ",
        orderDate: "កាលបរិច្ចេទបញ្ជាទិញ",
        paymentMethod: "វិធីបង់ប្រាក់",
        shippingMethod: "វិធីដឹកជញ្ជូន",
        totalAmount: "ចំនួនសរុប",
        shippingAddress: "អាសយដ្ឋានដឹកជញ្ជូន",
        estimatedDelivery: "ការដឹកជញ្ជូនប៉ាន់ស្មាន",
        expressShipping: "ការដឹកជញ្ជូនលឿន (១-៣ ថ្ងៃធ្វើការ)",
        whatsNext: "អ្វីបន្ទាប់?",
        orderConfirmation:
          "ការបញ្ជាក់ការបញ្ជាទិញ: អ្នកនឹងទទួលបានអ៊ីមែលបញ្ជាក់ក្នុងពេលឆាប់ៗនេះជាមួយនឹងព័ត៌មានលម្អិតនៃការបញ្ជាទិញរបស់អ្នក។",
        processing:
          "ការដំណើរការ: ការបញ្ជាទិញរបស់អ្នកនឹងត្រូវបានដំណើរការ និងរៀបចំសម្រាប់ការដឹកជញ្ជូនក្នុងរយៈពេល ១ ថ្ងៃធ្វើការ។",
        shipping:
          "ការដឹកជញ្ជូន: អ្នកនឹងទទួលបានព័ត៌មានតាមដាននៅពេលដែលការបញ្ជាទិញរបស់អ្នកត្រូវបានដឹកជញ្ជូន។",
        delivery: "ការដឹកជញ្ជូន: ការបញ្ជាទិញរបស់អ្នកនឹងមកដល់នៅ",
        trackYourOrder: "តាមដានការបញ្ជាទិញរបស់អ្នក",
        continueShopping: "បន្តទិញទំនិញ",
        needHelp: "ត្រូវការជំនួយ?",
        supportDescription:
          "ប្រសិនបើអ្នកមានសំណួរណាមួយអំពីការបញ្ជាទិញរបស់អ្នក ក្រុមគាំទ្រអតិថិជនរបស់យើងនៅទីនេះដើម្បីជួយ។",
        contactSupport: "ទាក់ទងការគាំទ្រ",
        helpCenter: "មជ្ឈមណ្ឌលជំនួយ",
        creditCard: "កាតឥណទាន",
        qty: "បរិមាណ",
      },

      // Footer
      footer: {
        companyDescription:
          "ហាងអេឡិចត្រូនិចដែលអាចទុកចិត្តបាន ផ្តល់ជូននូវផលិតផលបច្ចេកវិទ្យាថ្មីៗ ជាមួយនឹងការដឹកជញ្ជូនលឿន និងសេវាកម្មអតិថិជនល្អឥតខ្ចោះ។",
        paymentMethods: "វិធីបង់ប្រាក់",
        quickLinks: "តំណភ្ជាប់រហ័ស",
        customerService: "សេវាកម្មអតិថិជន",
        aboutUs: "អំពីយើង",
        contactUs: "ទាក់ទងយើង",
        privacyPolicy: "គោលការណ៍ភាពឯកជន",
        termsOfService: "លក្ខខណ្ឌសេវាកម្ម",
        shippingInfo: "ព័ត៌មានដឹកជញ្ជូន",
        returns: "ការត្រឡប់",
        faq: "សំណួរញឹកញាប់",
        support: "ការគាំទ្រ",
        myAccount: "គណនីរបស់ខ្ញុំ",
        orderHistory: "ប្រវត្តិការបញ្ជាទិញ",
        wishlist: "បញ្ជីចង់បាន",
        newsletter: "ព្រឹត្តិប័ត្រ",
        subscribeNewsletter:
          "ជាវព្រឹត្តិប័ត្ររបស់យើងសម្រាប់ការអាប់ដេត និងការផ្តល់ជូនពិសេស",
        enterEmail: "បញ្ចូលអ៊ីមែលរបស់អ្នក",
        subscribe: "ជាវ",
        followUs: "តាមដានយើង",
        address: "165-179 Forster Road City of Monash, Melbourne, Australia",
        copyright: "©2024 រក្សាសិទ្ធិ Elecxo - រក្សាសិទ្ធិទាំងអស់",
        language: "ភាសា",
      },

      // Search
      search: {
        title: "ស្វែងរក",
        resultsFor: "លទ្ធផលស្វែងរកសម្រាប់",
        foundResults: "បង្ហាញ {count} នៃ {total} លទ្ធផល",
        searching: "កំពុងស្វែងរក...",
        enterQuery: "បញ្ចូលពាក្យស្វែងរក",
        searchHint: "ព្យាយាមស្វែងរកផលិតផល ម៉ាក ឬប្រភេទ",
        noResults: "រកមិនឃើញលទ្ធផល",
        noResultsHint: "ព្យាយាមកែប្រែពាក្យស្វែងរក ឬសម្អាតតម្រង",
        suggestions: "ការណែនាំ",
        recentSearches: "ការស្វែងរកថ្មីៗ",
        clear: "សម្អាត",
        clearFilters: "សម្អាតតម្រង",
        noSuggestions: "មិនមានការណែនាំ",
        filters: "តម្រង",
        category: "ប្រភេទ",
        brand: "ម៉ាក",
        priceRange: "ជួរតម្លៃ",
        inStock: "មានស្តុកតែប៉ុណ្ណោះ",
        onSale: "កំពុងលក់",
        showing: "បង្ហាញ {count} លទ្ធផល",
        sortRelevance: "តម្រៀបតាមភាពពាក់ព័ន្ធ",
        sortPriceLow: "តម្លៃ: ពីទាបទៅខ្ពស់",
        sortPriceHigh: "តម្លៃ: ពីខ្ពស់ទៅទាប",
        sortNewest: "ថ្មីបំផុតមុន",
        sortRating: "ការវាយតម្លៃខ្ពស់បំផុត",
      },

      // Common
      common: {
        loading: "កំពុងផ្ទុក...",
        error: "កំហុស",
        retry: "ព្យាយាមម្តងទៀត",
        close: "បិទ",
        save: "រក្សាទុក",
        cancel: "បោះបង់",
        confirm: "បញ្ជាក់",
        delete: "លុប",
        edit: "កែប្រែ",
        add: "បន្ថែម",
        remove: "យកចេញ",
        update: "ធ្វើបច្ចុប្បន្នភាព",
        submit: "ដាក់ស្នើ",
        reset: "កំណត់ឡើងវិញ",
      },

      // Error handling
      error: {
        pageNotFound: "រកមិនឃើញទំព័រ",
        pageNotFoundDescription:
          "សូមអភ័យទោស ទំព័រដែលអ្នកកំពុងស្វែងរកមិនមាន ឬត្រូវបានផ្លាស់ទី។",
        goHome: "ទៅទំព័រដើម",
        browseProducts: "មើលផលិតផល",
        searchProducts: "ស្វែងរកផលិតផល",
        searchPlaceholder: "តើអ្នកកំពុងស្វែងរកអ្វី?",
        popularCategories: "ប្រភេទពេញនិយម",
        suggestedProducts: "អ្នកប្រហែលជាចូលចិត្តទាំងនេះ",
        somethingWentWrong: "មានបញ្ហាកើតឡើង",
        unexpectedError:
          "យើងបានជួបបញ្ហាមិនរំពឹងទុក។ ក្រុមការងាររបស់យើងត្រូវបានជូនដំណឹង ហើយយើងកំពុងធ្វើការដោះស្រាយ។",
        tryAgain: "ព្យាយាមម្តងទៀត",
        reportIssue: "រាយការណ៍បញ្ហា",
        errorId: "លេខកំហុស",
        errorDetails: "ព័ត៌មានលម្អិតកំហុស",
        persistentIssue: "ប្រសិនបើបញ្ហានេះនៅតែបន្ត សូមទាក់ទងក្រុមជំនួយរបស់យើង។",
      },

      // Toast notifications
      toast: {
        success: "ជោគជ័យ",
        error: "កំហុស",
        warning: "ការព្រមាន",
        info: "ព័ត៌មាន",
        addedToCart: "បានបន្ថែមទៅកន្ត្រក់",
        removedFromCart: "បានយកចេញពីកន្ត្រក់",
        cartUpdated: "កន្ត្រក់ត្រូវបានធ្វើបច្ចុប្បន្នភាព",
        searchCompleted: "ការស្វែងរកបានបញ្ចប់",
        searchFailed: "ការស្វែងរកបរាជ័យ",
        networkError: "កំហុសបណ្តាញ",
        tryAgain: "ព្យាយាមម្តងទៀត",
        dismiss: "បិទ",
      },

      // Wishlist
      wishlist: {
        title: "បញ្ជីចង់បាន",
        empty: "បញ្ជីចង់បានរបស់អ្នកទទេ",
        emptyDescription: "ចាប់ផ្តើមបន្ថែមផលិតផលដែលអ្នកចូលចិត្តទៅបញ្ជីចង់បាន",
        addToWishlist: "បន្ថែមទៅបញ្ជីចង់បាន",
        removeFromWishlist: "យកចេញពីបញ្ជីចង់បាន",
        addedToWishlist: "បានបន្ថែមទៅបញ្ជីចង់បាន",
        removedFromWishlist: "បានយកចេញពីបញ្ជីចង់បាន",
        alreadyInWishlist: "មានក្នុងបញ្ជីចង់បានរួចហើយ",
        moveToCart: "ផ្លាស់ទីទៅកន្ត្រក់",
        movedToCart: "បានផ្លាស់ទីទៅកន្ត្រក់",
        bulkMoveToCart: "ផ្លាស់ទីទាំងអស់ទៅកន្ត្រក់",
        bulkMovedToCart: "ផលិតផលបានផ្លាស់ទីទៅកន្ត្រក់",
        clearWishlist: "សម្អាតបញ្ជីចង់បាន",
        cleared: "បញ្ជីចង់បានត្រូវបានសម្អាត",
        shareWishlist: "ចែករំលែកបញ្ជីចង់បាន",
        shared: "បញ្ជីចង់បានត្រូវបានចែករំលែក",
        shareLink: "តំណភ្ជាប់ចែករំលែក",
        itemCount: "{{count}} ផលិតផល",
        itemCount_plural: "{{count}} ផលិតផល",
        addedOn: "បានបន្ថែមនៅ",
        selectAll: "ជ្រើសរើសទាំងអស់",
        selectNone: "មិនជ្រើសរើស",
        selectedItems: "បានជ្រើសរើស {{count}}",
        removeSelected: "យកចេញដែលបានជ្រើសរើស",
        moveSelected: "ផ្លាស់ទីដែលបានជ្រើសរើសទៅកន្ត្រក់",
        continueShopping: "បន្តទិញទំនិញ",
        browseProducts: "មើលផលិតផល",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18n;

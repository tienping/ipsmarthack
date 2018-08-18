import firebase from 'react-native-firebase';
const Fabric = require('react-native-fabric');
const ReactMoE = require('react-native-moengage');
const { Answers } = Fabric;

firebase.analytics().setAnalyticsCollectionEnabled(true);

export const FirebaseAnalytics = {
    logAddToWishList: ({ item_id, item_name, item_category, item_location_id, value, price, currency }) => {
        firebase.analytics().logEvent('add_to_wishlist', { item_id, item_category, item_name, item_location_id, value, price, currency });
    },
    logAddToCart: ({ item_id, item_name, item_category, item_location_id, value, price, currency, quantity }) => {
        firebase.analytics().logEvent('add_to_cart', { item_id, item_category, item_name, item_location_id, value, price, currency, quantity });
    },
    logSearch: ({ search_text }) => {
        firebase.analytics.logEvent('search', { search_text });
    },
    logPageView: ({ id, name, sale_price, page_type }) => {
        firebase.analytics().logEvent('page_view', { id, name, sale_price, page_type });
    },
    logCheckoutSuccess: ({ order_id, order_amount, estimated_delivery_date, delivery_medium }) => {
        firebase.analytics().logEvent('checkout_success', { order_id, order_amount, estimated_delivery_date, delivery_medium });
    },
    logCheckoutError: ({ order_id, order_amount, error_code, error_description, retry_number }) => {
        firebase.analytics().logEvent('checkout_success', { order_id, order_amount, error_code, error_description, retry_number });
    },
    logInstall: ({ source_of_install }) => {
        firebase.analytics().logEvent('install', { source_of_install });
    },
    logStartedSignUp: ({ source_of_install }) => {
        firebase.analytics().logEvent('started_signup', { source_of_install });
    },
    logSignUpSubmit: ({ email, phone, method }) => {
        firebase.analytics().logEvent('signup_submit', { email, phone, method });
    },
    logSignUpSuccess: ({ email, phone, method, FbID }) => {
        firebase.analytics().logEvent('signup_success', { email, phone, method, FbID });
    },
    logSignUpFailed: ({ email, phone, errCode, errorDescription }) => {
        firebase.analytics().logEvent('signup_success', { email, phone, errCode, errorDescription });
    },
};

export const FabricAnalytics = {
    logAddToWishList: ({ id, brand, name, price, status, pagePosition }) => {
        Answers.logCustom('Wish List', {
            'Product Id': id,
            'Product Name': name,
            'Product Brand': brand,
            'Product Price': price,
            'Event Success': status,
            'Event Triggered From': pagePosition,
        });
    },
    logAddToCart: ({ id, type, brand, name, price, qty, status, pagePosition }) => {
        Answers.logCustom('Add To Cart', {
            'Product Id': id,
            'Product Type': type,
            'Product Name': name,
            'Product Brand': brand,
            'Product Price': price,
            'Product Qty': qty,
            'Event Success': status,
            'Event Triggered From': pagePosition,
        });
    },
    logDynamicView: ({ id, url, pagePosition }) => {
        Answers.logCustom('Scroll', {
            'Page Id': id,
            'Page Url': url,
            'Event Triggered From': pagePosition,
        });
    },
    logProductView: ({ id, brand, name, price, pagePosition }) => {
        Answers.logCustom('Product View', {
            'Product Id': id,
            'Product Name': name,
            'Product Brand': brand,
            'Product Price': price,
            'Event Triggered From': pagePosition,
        });
    },
    logActivityView: ({ page_type }) => {
        Answers.logCustom('Activity View', { 'Page Type': page_type });
    },
    logTimetableView: ({ type, url, pagePosition }) => {
        Answers.logCustom('Timetable View', {
            'Timetable Type': type,
            'Timetable Links': url,
            'Event Triggered From': pagePosition,
        });
    },
    logMakeOrder: ({ time, courier, gateway, total, shipping, status, pagePosition }) => {
        Answers.logCustom('Make Order', {
            'Order Created Time': time,
            'Order Courier': courier,
            'Order Payment Gateway': gateway,
            'Order Subtotal': total,
            'Order Shipping Value': shipping,
            'Event Success': status,
            'Event Triggered From': pagePosition,
        });
    },
    logMakePayment: ({ gateway, paymentChannel, total, time, status, pagePosition }) => {
        Answers.logCustom('Make Payment', {
            'Payment Gateway': gateway,
            'Payment Channel': paymentChannel,
            'Payment Amount': total,
            'Payment Created At': time,
            'Payment Status': status,
            'Event Triggered From': pagePosition,
        });
    },
    logScroll: ({ pagination, pagePosition }) => {
        Answers.logCustom('Scroll', {
            'Pagination': pagination,
            'Event Triggered From': pagePosition,
        });
    },
    logMainTabbed: ({ tab, pagePosition }) => {
        Answers.logCustom('Main Tabbed', {
            'Page Type': tab,
            'Event Triggered From': pagePosition,
        });
    },
    logSearch: ({ term, result }) => {
        Answers.logCustom('Search', {
            'Search String': term,
            'Search Result Found': result,
        });
    },
    logShare: ({ shareType, shareValue, pagePosition }) => {
        Answers.logCustom('Share', {
            'Share Type': shareType,
            'Share Value': shareValue,
            'Event Triggered From': pagePosition,
        });
    },
    logButtonClick: ({ buttonName, pagePosition }) => {
        Answers.logCustom('Button Click', {
            'Button Name': buttonName,
            'Event Triggered From': pagePosition,
        });
    },
    logSignUp: ({ type }) => {
        Answers.logCustom('Sign up', {
            'SignUp Type': type,
        });
    },
    logLogin: ({ type }) => {
        Answers.logCustom('Login', {
            'Login Type': type,
        });
    },
    logBeautyWallShare: ({ value }) => {
        Answers.logCustom('Share Beauty Review', {
            'Share Value': value,
        });
    },
    logBeautyReviewOpen: ({ value }) => {
        Answers.logCustom('Click Beauty Review Link', {
            'Share Value': value,
        });
    },
    logBeautyReviewConverted: ({ type }) => {
        Answers.logCustom('Beauty Review Converted', {
            'Converted Type': type,
        });
    },
};

export const MoEngageAnalytics = {
    // ReactMoE.trackEvent("Purchase", {"quantity":1, "product":"iPhone", "currency":"dollar", "price":699, "new_item" : true});
    setUniqueID: ({ id }) => {
        ReactMoE.setUserUniqueID(id);
    },
    setUserAttributes: ({ email, gender, ethnicity, name, membership }) => {
        ReactMoE.setUserAttribute(email);
        ReactMoE.setUserAttribute(gender);
        ReactMoE.setUserAttribute(ethnicity);
        ReactMoE.setUserAttribute(name);
        ReactMoE.setUserAttribute(membership);
    },
    logSearch: ({ search_text }) => {
        ReactMoE.trackEvent('analytic_search', { 'search_text': search_text });
    },
    logPageView: ({ id, name, type }) => {
        ReactMoE.trackEvent('analytic_pageView', {
            'id': id,
            'name': name,
            'page_type': type,
        });
    },
    logProductView: ({ id, name, groupId, groupName, categoryId, categoryName, subCategoryId, subCategoryName, price }) => {
        ReactMoE.trackEvent('analytic_productView', {
            'id': id,
            'name': name,
            'price': price,
            'group_id': groupId,
            'group_name': groupName,
            'category_id': categoryId,
            'category_name': categoryName,
            'sub_category_id': subCategoryId,
            'sub_category_name': subCategoryName,
        });
    },
    logAddtoCart: ({ id, name, groupId, groupName, categoryId, categoryName, subCategoryId, subCategoryName, price, quantity }) => {
        ReactMoE.trackEvent('analytic_addToCart', {
            'id': id,
            'name': name,
            'price': price,
            'group_id': groupId,
            'quantity': quantity,
            'group_name': groupName,
            'category_id': categoryId,
            'category_name': categoryName,
            'sub_category_id': subCategoryId,
            'sub_category_name': subCategoryName,
        });
    },
    logRemoveFromCart: ({ id, name, groupId, groupName, categoryId, categoryName, subCategoryId, subCategoryName, price, quantity }) => {
        ReactMoE.trackEvent('analytic_removeFromCart', {
            'id': id,
            'name': name,
            'price': price,
            'group_id': groupId,
            'quantity': quantity,
            'group_name': groupName,
            'category_id': categoryId,
            'category_name': categoryName,
            'sub_category_id': subCategoryId,
            'sub_category_name': subCategoryName,
        });
    },
    logAddToWishList: ({ id, name, groupId, groupName, categoryId, categoryName, subCategoryId, subCategoryName, price }) => {
        ReactMoE.trackEvent('analytic_addToWishlist', {
            'id': id,
            'name': name,
            'price': price,
            'group_id': groupId,
            'group_name': groupName,
            'category_id': categoryId,
            'category_name': categoryName,
            'sub_category_id': subCategoryId,
            'sub_category_name': subCategoryName,
        });
    },
    logRemoveFromWishList: ({ id, name, groupId, groupName, categoryId, categoryName, subCategoryId, subCategoryName, price }) => {
        ReactMoE.trackEvent('analytic_removeFromWishlist', {
            'id': id,
            'name': name,
            'price': price,
            'group_id': groupId,
            'group_name': groupName,
            'category_id': categoryId,
            'category_name': categoryName,
            'sub_category_id': subCategoryId,
            'sub_category_name': subCategoryName,
        });
    },
    logOrderCreated: ({ orderId, cartSize, cartAmount, purchaseAmount, productId, productName, groupId, groupName, categoryId, categoryName, subCategoryId, subCategoryName, price, quantity, city, state, postcode, pcodeApplied, pcodeName, pcodeAmount, payment, courier, estimateDelivery }) => {
        ReactMoE.trackEvent('analytic_orderCreated', {
            'price': price,
            'payment': payment,
            'courier': courier,
            'order_id': orderId,
            'group_id': groupId,
            'quantity': quantity,
            'address_city': city,
            'cart_size': cartSize,
            'address_state': state,
            'product_id': productId,
            'pcode_name': pcodeName,
            'group_name': groupName,
            'category_id': categoryId,
            'cart_amount': cartAmount,
            'product_name': productName,
            'pcode_amount': pcodeAmount,
            'address_postcode': postcode,
            'category_name': categoryName,
            'pcode_applied': pcodeApplied,
            'sub_ategory_id': subCategoryId,
            'purchase_amount': purchaseAmount,
            'sub_category_name': subCategoryName,
            'estimate_delivery': estimateDelivery,
        });
    },
    logPaymentSuccess: ({ orderId, cartSize, cartAmount, purchaseAmount, productId, productName, groupId, groupName, categoryId, categoryName, subCategoryId, subCategoryName, price, quantity, city, state, postcode, pcodeApplied, pcodeName, pcodeAmount, payment, courier, estimateDelivery }) => {
        ReactMoE.trackEvent('analytic_paymentSuccess', {
            'price': price,
            'payment': payment,
            'courier': courier,
            'order_id': orderId,
            'group_id': groupId,
            'quantity': quantity,
            'address_city': city,
            'cart_size': cartSize,
            'address_state': state,
            'product_id': productId,
            'pcode_name': pcodeName,
            'group_name': groupName,
            'category_id': categoryId,
            'cart_amount': cartAmount,
            'product_name': productName,
            'pcode_amount': pcodeAmount,
            'address_postcode': postcode,
            'category_name': categoryName,
            'pcode_applied': pcodeApplied,
            'sub_ategory_id': subCategoryId,
            'purchase_amount': purchaseAmount,
            'sub_category_name': subCategoryName,
            'estimate_delivery': estimateDelivery,
        });
    },
    logOut: () => {
        ReactMoE.logout();
    },
};

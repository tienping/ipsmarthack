import { dataChecking, HerToast  } from 'utils/hermoUtils';
import branch from 'react-native-branch';
import { globalScope } from 'hermo/globalScope';
import { Platform, AlertIOS, ToastAndroid } from 'react-native';
const Clipboard = require('react-native-clipboard');

import { store } from '../../App';

const TARGET_IN_PAGE = 'in-page';
const TARGET_NEW_PAGE = 'new-page';
const TYPE_MALL = 'mall';
const TYPE_MASK = 'mask';
const TYPE_BRAND = 'brand';
const TYPE_GROUP = 'group';
const TYPE_CATEGORY = 'category';
const TYPE_SUBCATEGORY = 'subcategory';
const TYPE_PROMOTION = 'promotion';
const TYPE_REVIEW_MALL = 'review_mall';
const TYPE_EVENT_NOTIFY = 'event_notify';
const TYPE_SPECIAL_PAGE = 'special_page';

// new page_id
const PAGE_MALL_LIST = 'mall-list';
const PAGE_MALL_VIEW = 'mall-view';
const PAGE_MASK_VIEW = 'mask-view';
const PAGE_BUNDLE_VIEW = 'bundle-view';
const PAGE_MASK_CART = 'mask-cart';
const PAGE_HOTDEAL = 'hotdeal-list';
const PAGE_SEARCH_RESULT = 'search-result';
const PAGE_BEAUTY_GRAB = 'beauty-grab';
const PAGE_BEAUTY_WALL = 'beauty-wall';
const PAGE_EVENT_LIST = 'event-list';
const REVIEW_MALL = 'review-mall';
const OPEN_WEB_URL = 'open-web-url';
const OPEN_APP_STORE = 'open-app-store';

// in-page id
const POPUP_IMAGE_DIALOG = 'image-dialog';
const HTML_STRING_DIALOG = 'html-string-dialog';
const HTML_URL_DIALOG = 'html-url-dialog';
const VIDEO_DIALOG = 'video-dialog';
export const HTML_API_DIALOG = 'html-api-dialog';
const COPY = 'copy-to-clipboard';
const QUICK_ADD_TO_CART = 'cart-mall';
const EVENT_REDEEM = 'event-redeem';
const MODAL = 'modal';
const SHARE = 'share';

export function handleAppLink(applink, navigator, pageTitle) {
    if (!applink) {
        return null;
    }
    if (isNewPage(applink.target) && navigator) {
        decideDestination(applink, navigator, pageTitle);
    } else {
        decideInPageAction(applink, navigator);
    }
    return null;
}

function isNewPage(target) {
    if (target === TARGET_NEW_PAGE) {
        return true;
    }
    return false;
}

function obsorbUrl(params) {
    for (let i = 0; i < params.length; i += 1) {
        if (params[i].key === 'url') {
            return params[i].value;
        }
    }
    return null;
}

function decideDestination(applink, navigator, pageTitle) {
    const pageId = applink.page.id;
    const { type, id, page } = applink;
    const url = obsorbUrl(applink.page.params);

    switch (pageId) {
        case PAGE_MALL_LIST:
            navigateToScreen({
                navigator,
                routeName: 'hermorn.screen.HerListing',
                params: { data: url, pageTitle, flatListId: `${type}-${id}` },
            });
            break;
        case PAGE_MALL_VIEW:
            if (id) {
                if (id === '4877') {
                    navigateToScreen({
                        navigator,
                        routeName: 'hermorn.screen.BundleBox',
                        params: { bundleID: id, pageTitle: 'Bundle Box', },
                    });
                } else {
                    navigateToScreen({
                        navigator,
                        routeName: 'hermorn.screen.ProductInfo',
                        params: { data: id, pageTitle },
                    });
                }
            }
            break;
        // case PAGE_MASK_VIEW:
        //     break;
        case PAGE_BUNDLE_VIEW:
            if (dataChecking(id)) {
                navigateToScreen({
                    navigator,
                    routeName: 'hermorn.screen.BundleBox',
                    params: { bundleID: id, pageTitle: 'Bundle Box' },
                });
            }
            break;
        // case PAGE_MASK_CART:
        //     break;
        case PAGE_HOTDEAL:
            // event view
            break;
        case PAGE_SEARCH_RESULT:
            break;
        case PAGE_BEAUTY_GRAB:
            break;
        case PAGE_BEAUTY_WALL:
            if (id) {
                navigator.push({
                    screen: 'hermorn.screen.Herfeed',
                    animated: true,
                    backButtonTitle: '',
                    title: 'BEAUTY WALL',
                    passProps: {
                        data: id,
                    },
                });
            }
            break;
        case PAGE_EVENT_LIST:
            if (id && url) {
                navigateToScreen({
                    navigator,
                    routeName: 'hermorn.screen.CampaignViewer',
                    params: { data: { id, url }, pageTitle },
                });
            } else if (id) {
                navigateToScreen({
                    navigator,
                    routeName: 'hermorn.screen.CampaignViewer',
                    params: { data: { id, url: null }, pageTitle },
                });
            }
            break;
        case OPEN_WEB_URL:
            break;
        case OPEN_APP_STORE:
            break;
        default:
            break;
    }
}

export function navigateToScreen({ navigator, routeName, params }) {
    navigator.push({
        title: params.pageTitle || '',
        backButtonTitle: '',
        screen: routeName,
        passProps: params,
    });


    switch (routeName) {
        case 'proceedToBrandList':
            // store.dispatch(NavigationActions.navigate({ routeName: 'Brand' }));
            break;
        default:
            return null;
    }

    return null;
}
export function navigateToLightBox({ navigator, routeName, params }) {
    navigator.showLightBox({
        screen: routeName,
        passProps: params,
    });

}

function decideInPageAction(applink, navigator) {
    const pageId = applink.page.id;
    const url = obsorbUrl(applink.page.params);
    // const { id } = applink;
    switch (pageId) {
        case POPUP_IMAGE_DIALOG:
            navigateToLightBox({
                navigator,
                routeName: 'hermorn.screen.PopupDialog',
                params: { item: url, isImage: true },
            });
            break;
        case HTML_STRING_DIALOG:
            navigateToLightBox({
                navigator,
                routeName: 'hermorn.screen.PopupDialog',
                params: { item: url, isHtml: true },
            });
            break;
        case VIDEO_DIALOG:
        case HTML_URL_DIALOG:
            navigateToLightBox({
                navigator,
                routeName: 'hermorn.screen.PopupDialog',
                params: { item: url, isUrl: true },
            });
            break;
        case HTML_API_DIALOG:
            navigateToLightBox({
                navigator,
                routeName: 'hermorn.screen.PopupDialog',
                params: { item: url, isHtml: true, fireAPI: true, type: HTML_API_DIALOG},
            });
            break;
        case COPY:
            if (dataChecking(applink, 'id')) {
                Clipboard.set(applink.id);
                HerToast.show({
                    text: `${applink.id} Copied.`,
                    type: 'success',
                    duration: 5000,
                });
            }
            break;
        case QUICK_ADD_TO_CART:
            break;
        case EVENT_REDEEM:
            AlertIOS.alert(url);
            break;
        case MODAL:
            // store.dispatch(hermodalOpen({ content: <Text>asdfasf</Text>, type: 'video' }));
            break;
        case SHARE:
            break;
        default:
            break;
    }
}

export async function proceedShareAction(type, item) {
    let url;
    let page;
    let title;
    let desc;
    let imageUrl;

    switch (type) {
        case 'product':
            url = `https://www.hermo.my${item.url}`;
            title = dataChecking(item, 'display_name') ? item.display_name : '';
            desc = dataChecking(item, 'brief') ? item.brief : '';
            imageUrl = dataChecking(item, 'image', 'large') ? item.image.large : '';
            page = PAGE_MALL_VIEW;
            break;
        case 'event':
            url = `https://www.hermo.my${item.url}`;
            title = dataChecking(item, 'title') ? item.title : '';
            desc = dataChecking(item, '_page', 'share', 'caption') ? item._page.share.caption : '';
            imageUrl = dataChecking(item, '_page', 'share', 'picture') ? item._page.share.picture : '';
            page = PAGE_EVENT_LIST;
            break;
        case 'wall':
            url = `https://www.hermo.my/wall/${item.id}`;
            title = dataChecking(item, 'username') ? item.username : '';
            desc = dataChecking(item, 'comment') ? item.comment : '';
            imageUrl = dataChecking(item, 'image', 'original') ? item.image.original : '';
            page = PAGE_BEAUTY_WALL;
            break;
        default:
            break;
    }
    const branchUniversalObject = await branch.createBranchUniversalObject(`${item.id}`, {
        canonicalUrl: url,
        locallyIndex: true,
        title,
        contentDescription: desc,
        contentImageUrl: imageUrl,
        contentIndexingMode: 'public',
        contentMetadata: {
            page,
            href: dataChecking(item, '_links', 'self', 'href') ? item._links.self.href : '',
            item_id: item.id,
        },
    });

    const shareOptions = { messageHeader: 'Look Inside', messageBody: 'Check this out!' };
    const linkProperties = { feature: 'share', channel: 'facebook' };
    const controlParams = {
        $fallback_url: url,
        $desktop_url: url,
        $ios_url: 'app.hermo.my',
        $android_url: 'app.hermo.my',
    };

    await branchUniversalObject.showShareSheet(shareOptions, linkProperties, controlParams);
}

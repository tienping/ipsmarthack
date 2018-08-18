import Realm from 'realm';
import { errorLog } from 'utils/errorService';

// documentation: https://realm.io/docs/javascript/latest/#writes

export function realmSchema() {
    const AuthSchema = {
        name: 'Auth',
        properties: {
            token: 'string',
            isAdmin: 'bool',
            debuggerMode: 'bool',
        },
    };

    const RecentSearchSchema = {
        name: 'RecentSearch',
        properties: {
            productName: {
                type: 'string',
            },
        },
    };

    const RecentlyViewedSchema = {
        name: 'RecentlyViewed',
        properties: {
            product: 'string',
        },
    };

    return Realm.open({
        schema: [AuthSchema, RecentSearchSchema, RecentlyViewedSchema]
    });
}

export function writeSchema(schemaName, schemaObj) {
    return realmSchema().then((realm) => {
        try {
            realm.write(() => {
                realm.create(schemaName, schemaObj);
            });
        } catch (e) {
            errorLog(`error: cannot save ${schemaName}!`);
        }
    });
}

export function readSchema(schema) {
    return new Promise((resolve) => {
        realmSchema().then((realm) => {
            const schemaData = realm.objects(schema);
            if (schemaData.length > 0) {
                resolve(schemaData);
            }
            resolve(null);
        });
    });
}

export function deleteSchema(schema) {
    return realmSchema().then((realm) => {
        try {
            realm.write(() => {
                const schemaData = realm.objects(schema);
                realm.delete(schemaData);
            });
        } catch (e) {
            errorLog('cannot delete realm schema!');
        }
    });
}

/**
 *
 * HerFlatList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FlatList, View } from 'react-native';
import FooterLoadMore from 'components/FooterLoadMore/index';
import LoadingScreen from 'components/LoadingScreen/index';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHerFlatList, {
    makeSelectHerFlatListDbStore,
    makeSelectHerFlatListLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';


import { fetchNextPage, setInitItem } from './actions';

export class HerFlatList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    componentDidMount() {
        const { dispatch, nextPage, flatListId, data, retainData } = this.props;

        dispatch(setInitItem({
            flatListId,
            nextPageUrl: nextPage,
            data,
            retainData: retainData !== false,
        }));
    }

    onEndReached = () => {
        const { loading, flatListId, dbStore } = this.props;

        if (!loading && dbStore[flatListId] && dbStore[flatListId].nextPageUrl) {
            this.props.dispatch(fetchNextPage({
                flatListId,
                nextPageUrl: dbStore[flatListId].nextPageUrl,
            }));
        }
    };

    renderFooter = () => <FooterLoadMore visible={this.props.loading} />;

    render() {
        const { dbStore, flatListId, numColumns, layout, refreshing, onRefresh } = this.props;
        return (
            <View>
                {
                    dbStore && dbStore[flatListId] ?
                        <FlatList
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            key={layout}
                            numColumns={numColumns}
                            keyExtractor={(item, index) => index}
                            onEndReached={() => this.onEndReached()}
                            data={dbStore[flatListId].data}
                            onEndReachedThreshold={0.3}
                            ListFooterComponent={this.renderFooter}
                            ListHeaderComponent={this.props.header}
                            renderItem={({ item, index }) => this.props.render(item, index)}
                        />
                        :
                        <LoadingScreen visible={true} />
                }

            </View>
        );
    }
}

HerFlatList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    retainData: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    herflatlist: makeSelectHerFlatList(),
    loading: makeSelectHerFlatListLoading(),
    dbStore: makeSelectHerFlatListDbStore(),
});

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'herFlatList', reducer });
const withSaga = injectSaga({ key: 'herFlatList', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
)(HerFlatList);

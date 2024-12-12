import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { InfinitySpin } from 'react-loader-spinner';
import LoadingBox from './LoadingBox';

const Spinner = memo(({loading=true, width=200}) => {
    return (

        <LoadingBox>
            <InfinitySpin
                visible={loading}
                width={width}
                color="#fc3903" 
                ariaLabel="infinity-spin-loading"
            />
        </LoadingBox>
    );
});

Spinner.propTypes = {
    loading: PropTypes.bool,
    width: PropTypes.number
};

export default Spinner;
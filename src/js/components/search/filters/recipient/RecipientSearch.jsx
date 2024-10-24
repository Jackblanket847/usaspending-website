/**
 * Created by michaelbray on 2/16/17.
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import RecipientNameDUNSContainer from
    'containers/search/filters/recipient/RecipientNameDUNSContainer';
import SubmitHint from 'components/sharedComponents/filterSidebar/SubmitHint';
import SelectedRecipients from './SelectedRecipients';
import { usePrevious } from '../../../../helpers';
import RecipientResults from "./RecipientResults";

import FeatureFlag from "../../../sharedComponents/FeatureFlag";

const propTypes = {
    toggleRecipient: PropTypes.func,
    selectedRecipients: PropTypes.object,
    dirtyFilters: PropTypes.symbol
};

const RecipientSearch = ({ toggleRecipient, selectedRecipients, dirtyFilters }) => {
    const [hint, setHint] = useState(null);
    const prevDirtyFilters = usePrevious(dirtyFilters);

    let localSelectedRecipients = null;

    if (selectedRecipients.size > 0) {
        localSelectedRecipients = (<SelectedRecipients
            selectedRecipients={selectedRecipients}
            toggleRecipient={toggleRecipient} />);
    }

    useEffect(() => {
        if (dirtyFilters && prevDirtyFilters !== dirtyFilters) {
            if (hint) {
                hint.showHint();
            }
        }
    }, [dirtyFilters, hint, prevDirtyFilters]);

    return (
        <div className="recipient-filter">
            <div className="filter-item-wrap">
                <RecipientNameDUNSContainer
                    selectedRecipients={selectedRecipients}
                    toggleRecipient={toggleRecipient} />
                {localSelectedRecipients}
                <SubmitHint
                    ref={(component) => {
                        setHint(component);
                    }} />
                <FeatureFlag>
                    <RecipientResults
                        selectedRecipients={selectedRecipients}
                        toggleRecipient={toggleRecipient} />
                </FeatureFlag>
            </div>
        </div>
    );
};

RecipientSearch.propTypes = propTypes;
export default RecipientSearch;

import React from 'react';

import { faTimes, faEye, faFire } from '@fortawesome/free-solid-svg-icons';

import FaButton from '../components/FaButton';
import { ExportButton, ShowInfoButton } from '../viewer/controls';
import { ProfileTitle } from './meta';
import SearchBar from './search';

import { VIEW_ALL, VIEW_FLAT, VIEW_SOURCES_MERGED } from './views';

export default function Controls({
    data,
    showMetadataDetail,
    setShowMetadataDetail,
    exportCallback,
    view,
    setView,
    flameData,
    setFlameData,
    searchQuery,
}) {
    const { metadata } = data;

    return (
        <div className="controls">
            <ProfileTitle metadata={metadata} />
            <ShowInfoButton
                metadata={metadata}
                showMetadataDetail={showMetadataDetail}
                setShowMetadataDetail={setShowMetadataDetail}
            />
            {!flameData ? (
                <>
                    <FlameButton data={data} setFlameData={setFlameData} />
                    <ExportButton exportCallback={exportCallback} />
                    <ToggleViewButton
                        data={data}
                        view={view}
                        setView={setView}
                    />
                    <SearchBar searchQuery={searchQuery} />
                </>
            ) : (
                <ExitFlameButton setFlameData={setFlameData} />
            )}
        </div>
    );
}

const ToggleViewButton = ({ data, view, setView }) => {
    if (!Object.keys(data.classSources).length) {
        return null;
    }

    function onClick() {
        if (view === VIEW_ALL) {
            setView(VIEW_FLAT);
        } else if (view === VIEW_FLAT) {
            setView(VIEW_SOURCES_MERGED);
        } else {
            setView(VIEW_ALL);
        }
    }

    let label;
    if (view === VIEW_ALL) {
        label = 'all';
    } else if (view === VIEW_FLAT) {
        label = 'flat';
    } else {
        label = 'sources';
    }

    return (
        <FaButton
            icon={faEye}
            onClick={onClick}
            title="Toggle the view"
            extraClassName="sources-view-button"
        >
            <span>{label}</span>
        </FaButton>
    );
};

const FlameButton = ({ data, setFlameData }) => {
    if (data.threads.length !== 1) {
        return null;
    }

    function onClick() {
        setFlameData(data.threads[0]);
    }

    return (
        <FaButton
            icon={faFire}
            onClick={onClick}
            title="View the profile as a Flame Graph"
        />
    );
};

const ExitFlameButton = ({ setFlameData }) => {
    function onClick() {
        setFlameData(null);
    }

    return (
        <FaButton
            icon={faTimes}
            onClick={onClick}
            title="Exit the Flame Graph view"
        />
    );
};

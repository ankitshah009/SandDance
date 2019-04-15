// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as VegaDeckGl from './vega-deck.gl';
import { Color } from '@deck.gl/core/utils/color';
import {
    Column,
    ColumnTypeMap,
    SpecColorSettings,
    SpecLanguage,
    SpecViewOptions
} from './specs/types';
import { DeckProps } from '@deck.gl/core/lib/deck';
import { LightSettings } from '@deck.gl/core/lib/layer';
import { Search, SearchExpressionGroup } from './searchExpression/types';
import { SpecResult } from './specs/interfaces';

export * from './searchExpression/types';
export * from './specs/types';

/**
 * Map of ordinals per unique Id.
 */
export interface OrdinalMap {
    [uid: string]: number;
}

/**
 * Result of an attempt to render.
 */
export interface RenderResult {

    /**
     * Specification result object.
     */
    specResult: SpecResult;

    /**
     * Map of cube ordinals assigned by unique id.
     */
    ordinalMap: OrdinalMap;
}

/**
 * Lengths of time for a transition animation.
 */
export interface TransitionDurations extends VegaDeckGl.types.TransitionDurations {

    /**
     * Transition time when a filter is applied / removed.
     */
    scope: number;
}

/**
 * Customization options for the Viewer.
 */
export interface ViewerOptions extends SpecViewOptions {

    /**
     * Custom colors of various parts of the visualization.
     */
    colors: ColorSettings;

    /**
     * Language settings for the visualization.
     */
    language: Language;

    /**
     * Optional map of light settings for the visualization, per camera view type.
     */
    lightSettings?: { [view in VegaDeckGl.types.View]: LightSettings };

    /**
     * Lengths of time for a transition animation.
     */
    transitionDurations: TransitionDurations;

    /**
     * Optional error handler.
     */
    onError?: (errors: string[]) => void;

    /**
     * Optional handler when color context changes.
     */
    onColorContextChange?: () => void;

    /**
     * Optional handler to be invoked when data is filtered.
     */
    onDataFilter?: (filter: Search, filteredData: object[]) => void;

    /**
     * Optional handler to be invoked when selection has changed.
     */
    onSelectionChanged?: (search?: Search, activeIndex?: number) => void;

    /**
     * Optional handler when data is on stage.
     */
    onStage?: (stage: VegaDeckGl.types.Stage, deckProps: DeckProps) => void;

    /**
     * Optional handler when chart is presented.
     */
    onPresent?: () => void;

    /**
     * Optional handler when axis is clicked.
     */
    onAxisClick?: (e: TouchEvent | MouseEvent | PointerEvent, serch: SearchExpressionGroup) => void;

    /**
     * Optional handler when legend row is clicked.
     */
    onLegendRowClick?: (e: TouchEvent | MouseEvent | PointerEvent, legendRow: LegendRowWithSearch) => void;

    /**
     * Z value of selection polygons.
     */
    selectionPolygonZ: number;
}

export interface RenderOptions {
    columns?: Column[];
    columnTypes?: ColumnTypeMap;
    ordinalMap?: OrdinalMap;
    initialColorContext?: ColorContext;
    discardColorContextUpdates?: () => boolean;
}

/**
 * Custom colors of various parts of the visualization.
 */
export interface ColorSettings extends SpecColorSettings {

    /**
     * Color of the individually selected cube.
     */
    activeCube?: Color;

    /**
     * Color of the cube when mouse hovered.
     */
    hoveredCube?: Color;

    /**
     * Color of selected cubes.
     */
    selectedCube?: Color;

    /**
     * Color of axis hover hotspots.
     */
    axisSelectHighlight?: Color;

    /**
     * Method of coloring unselected cubes.
     */
    unselectedColorMethod?: ColorMethod;
}

/**
 * Labels in the sections of the chart panel.
 */
export interface Headers {

    /**
     * Label above chart controls.
     */
    chart: string;

    /**
     * Label above legend.
     */
    legend: string;

    /**
     * Label above selection area.
     */
    selection: string;

    /**
     * Label above details section.
     */
    details: string;
}

/**
 * Language settings.
 */
export interface Language extends SpecLanguage {

    /**
     * Labels in the sections of the chart panel.
     */
    headers: Headers;

    /**
     * Text to use for "search with Bing".
     */
    bing: string;

    /**
     * Button text to re-map color.
     */
    newColorMap: string;

    /**
     * Button text to keep same color.
     */
    oldColorMap: string;

    /**
     * Button text to deselect.
     */
    deselect: string;

    /**
     * Button text to filter out selected items.
     */
    exclude: string;

    /**
     * Button text to keep only selected items.
     */
    isolate: string;

    /**
     * Text for aggregated legend rows past maximum.
     */
    legendOther: string;

    /**
     * Button text for next item.
     */
    nextDetail: string;

    /**
     * Button text for previous item.
     */
    previousDetail: string;

    /**
     * Button text to remove all filters.
     */
    reset: string;

    /**
     * Label preceding number of items in selection.
     */
    selectionCount: (count: number) => string;
}

/**
 * Custom Vega color scheme.
 */
export interface ColorScheme {

    /**
     * Name of the color scheme.
     */
    scheme: string;

    /**
     * Array of CSS colors.
     */
    colors: string[];
}

export interface ColorMappedItem {
    color?: Color;
    unSelected?: boolean;
}

/**
 * Map of ordinal to color.
 */
export interface ColorMap {
    [ordinal: number]: ColorMappedItem;
}

/**
 * ColorMap plus an HTMLElement legend containing color.
 */
export interface ColorContext {
    colorMap: ColorMap;
    legendElement: HTMLElement;
    legend: VegaDeckGl.types.Legend;
}

export interface ColorMethod {
    (color: Color): Color;
}

export interface LegendRowWithSearch extends VegaDeckGl.types.LegendRow {
    search: SearchExpressionGroup;
}

export interface SelectionState {
    search?: Search;
    selectedData?: object[];
    active?: object;
}

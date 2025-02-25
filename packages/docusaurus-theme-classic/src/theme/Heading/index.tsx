/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import type {HeadingType, Props} from '@theme/Heading';
import {translate} from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';

import './styles.css';
import styles from './styles.module.css';

type HeadingComponent = (props: Props) => JSX.Element;

export const MainHeading: HeadingComponent = function MainHeading({...props}) {
  return (
    <header>
      <h1
        {...props}
        id={undefined} // h1 headings do not need an id because they don't appear in the TOC
      >
        {props.children}
      </h1>
    </header>
  );
};

const createAnchorHeading = (
  Tag: HeadingType,
): ((props: Props) => JSX.Element) =>
  function TargetComponent({id, ...props}) {
    const {
      navbar: {hideOnScroll},
    } = useThemeConfig();

    if (!id) {
      return <Tag {...props} />;
    }

    return (
      <Tag
        {...props}
        className={clsx('anchor', {
          [styles.anchorWithHideOnScrollNavbar]: hideOnScroll,
          [styles.anchorWithStickyNavbar]: !hideOnScroll,
        })}
        id={id}>
        {props.children}
        <a
          className="hash-link"
          href={`#${id}`}
          title={translate({
            id: 'theme.common.headingLinkTitle',
            message: 'Direct link to heading',
            description: 'Title for link to heading',
          })}>
          #
        </a>
      </Tag>
    );
  };

const Heading = (headingType: HeadingType): ((props: Props) => JSX.Element) => {
  return headingType === 'h1' ? MainHeading : createAnchorHeading(headingType);
};

export default Heading;

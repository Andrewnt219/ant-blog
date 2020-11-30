import React, { ReactNode } from 'react';

import { trimLastWord } from './';

export function preventOrphanText(title: string): ReactNode {
	const [titleHead, titleTail] = trimLastWord(title);

	let renderedText = <>{title}</>;

	if (titleHead)
		renderedText = (
			<>
				{titleHead}
				&nbsp;
				{titleTail}
			</>
		);
	return renderedText;
}

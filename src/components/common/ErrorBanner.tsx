import React from 'react';
import { getMessages } from '../../utils/errorMessages';
import { UI_TEXT } from '../../constants/uiText';
import { ErrorBannerProps } from '../../types/error';

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ errorCodes }) => {
  if (errorCodes.length === 0) {
    return null;
  }

  const messages = getMessages(errorCodes);

  return (
    <div
      className="error-banner"
      role="alert"
      aria-live="assertive"
      aria-label="Errores de validación"
    >
      <span className="error-icon" aria-hidden="true">
        ⚠️
      </span>
      <div className="error-messages">
        <h4 className="sr-only">{UI_TEXT.ERROR_BANNER.HEADING}</h4>
        {messages.map((message, index) => (
          <div key={index} className="error-message" role="text">
            {message}
          </div>
        ))}
      </div>
    </div>
  );
};

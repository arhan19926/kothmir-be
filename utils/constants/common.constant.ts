import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { config } from 'dotenv';
config();
export const CONTENT_TYPES = {
  APPLICATION_JSON: 'application/json',
  APPLICATION_XML: 'application/xml',
  APPLICATION_PDF: 'application/pdf',
  APPLICATION_OCTET_STREAM: 'application/octet-stream',
  APPLICATION_FORM_URLENCODED: 'application/x-www-form-urlencoded',
  APPLICATION_RSS_XML: 'application/rss+xml',
  APPLICATION_LD_JSON: 'application/ld+json',
  APPLICATION_ZIP: 'application/zip',
  TEXT_HTML: 'text/html',
  TEXT_PLAIN: 'text/plain',
  TEXT_CSS: 'text/css',
  TEXT_XML: 'text/xml',
  TEXT_CSV: 'text/csv',
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  IMAGE_GIF: 'image/gif',
  AUDIO_MPEG: 'audio/mpeg',
  VIDEO_MP4: 'video/mp4',
  MULTIPART_FORM_DATA: 'multipart/form-data',
};

export const mockTenantId = process.env.TEST_TENANT_ID;

export const hstsMaxAge = 31536000;

export const HEADER_PROPERTIES = {
  X_FORWARDED_FOR: 'x-forwarded-for',
  USER_AGENT: 'user-agent',
};

export const UNAUTHORIZED_EXCEPTION = new UnauthorizedException();
export const FORBIDDEN_EXCEPTION = new ForbiddenException(
  'You do not have privileges to perform this action.',
);

export const ENVIRONMENT_TYPES = {
  DEV: 'dev',
  PROD: 'prod',
};

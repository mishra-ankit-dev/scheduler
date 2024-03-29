"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 3.1.4.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from apscheduler.schedulers.background import BackgroundScheduler
import os
import sys
from datetime import datetime
from pathlib import Path

import logstash

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'ov+pezi+xl8x$6c==__h2+rj(htrli0a*_1+!5+do^j2!v2$(^'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['localhost', 'blrkec360833l', 'vimpblt01-22']
# ALLOWED_HOSTS = ['*',]
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_HTTPONLY = False

# Background Scheduler from APScheduler


scheduler = BackgroundScheduler()


# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'features.ae',
    'features.ae.api',
    'features.ae.server',
    'features.ae.schedule',
    'features.ae.trigger',

    'features.uipath',
    'features.uipath.api',
    'features.uipath.server',
    'features.uipath.schedule',
    'features.uipath.trigger',
    'features.uipath.execution',

    'features.bp',
    'features.bp.api',
    'features.bp.server',
    'features.bp.schedule',
    'features.bp.trigger',
    'features.bp.execution',

    'features.authentication',
    'features.users',

    'features.health',

    'rest_framework',
    'rest_framework.authtoken',
    'django_apscheduler',
    'django_python3_ldap',
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': "[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s",
            'datefmt': "%d/%b/%Y %H:%M:%S"
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.TimedRotatingFileHandler',
            'filename': os.path.join(BASE_DIR, 'logs/backend.log'),
            'formatter': 'verbose',
            'when': 'midnight',
            'backupCount': 30,
            'formatter': 'verbose'
        },
        'logstash': {
            'level': 'DEBUG',
            'class': 'logstash.TCPLogstashHandler',
            'host': 'vimpblt01-22',
            'port': 5959,  # Default value: 5959
            # Version of logstash event schema. Default value: 0 (for backward compatibility of the library)
            'version': 1,
            # 'type' field in logstash message. Default value: 'logstash'.
            'message_type': 'django',
            # Fully qualified domain name. Default value: false.
            'fqdn': False,
            # list of tags. Default: None.
            'tags': ['django.request', 'django.server'],
            # 'formatter': 'verbose'
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose'
            # 'formatter': 'standard'
        },
    },
    'loggers': {
        'django.request': {
            'handlers': ['logstash'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'django.server': {
            'handlers': ['console', 'logstash'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'django.db.backends': {
            'handlers': ['logstash'],
            'level': 'DEBUG',
            'propagate': True,
        },
        # 'django': {
        #     'handlers': ['logstash'],
        #     'propagate': True,
        #     'level': 'DEBUG',
        # },
        'BACKEND': {
            'handlers': ['logstash'],
            'level': 'ERROR',
        },
    }
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    # 'django.contrib.auth.middleware.RemoteUserMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# AUTHENTICATION_BACKENDS = [
#     'django.contrib.auth.backends.RemoteUserBackend',
#     "django.contrib.auth.backends.ModelBackend",

# ]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }

    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': 'impact-rpa',
    #     'USER': 'impact-rpa',
    #     'PASSWORD': 'impact-rpa',
    #     'HOST': 'vimpblt01-22',
    #     'PORT': '5432',
    # }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'users.User'

# AUTHENTICATION_BACKENDS = [
#     "django_auth_ldap.backend.LDAPBackend",
#     "django.contrib.auth.backends.ModelBackend",
# ]

# REST_FRAMEWORK = {
#     # 'DEFAULT_AUTHENTICATION_CLASSES': (
#     #            'rest_framework.authentication.SessionAuthentication',
#     #            'rest_framework.authentication.BasicAuthentication',
#     ),
#     # 'DEFAULT_PERMISSION_CLASSES':(
#     #             'rest_framework.permissions.IsAuthenticated',
#     # ),

# }

CLOUDINARY = {
    'cloud_name': 'hyh8ot57n',
    'api_key': '996932211246411',
    'api_secret': 'okBHFdK0lL2SBPOjs7BT96w805M',
}

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Asia/Kolkata'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / "static",
    BASE_DIR / "static/ui",
]

MEDIA_DIR = F'{BASE_DIR}/media'
MEDIA_ROOT = MEDIA_DIR
MEDIA_URL = '/media/'


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = os.environ.get("email")
EMAIL_HOST_PASSWORD = os.environ.get("password")
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

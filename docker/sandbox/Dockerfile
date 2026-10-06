FROM php:8.5-cli

RUN useradd \
    --create-home \
    --shell /usr/sbin/nologin \
    runner

COPY runner.php /app/runner.php
COPY user-code.ini /app/user-code.ini

# Directorio vacío para impedir que el PHP del usuario
# cargue configuraciones adicionales de conf.d.
RUN mkdir -p /app/empty-php-conf
ENV PHP_CLI_SERVER_WORKERS=10

USER runner

WORKDIR /sandbox

CMD ["php", "-S", "0.0.0.0:8080", "/app/runner.php"]

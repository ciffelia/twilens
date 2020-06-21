# Download sudachi dictionary
FROM buildpack-deps:buster as sudachi-dict-downloader

ARG SUDACHI_CORE_DICT_URL="https://object-storage.tyo2.conoha.io/v1/nc_2520839e1f9641b08211a5c85243124a/sudachi/sudachi-dictionary-20200330-core.zip"
ARG SUDACHI_FULL_DICT_URL="https://object-storage.tyo2.conoha.io/v1/nc_2520839e1f9641b08211a5c85243124a/sudachi/sudachi-dictionary-20200330-full.zip"
ARG SUDACHI_DICT_VERSION="20200330"

RUN curl -fsSLO ${SUDACHI_CORE_DICT_URL} && \
    curl -fsSLO ${SUDACHI_FULL_DICT_URL} && \
    unzip -o "./sudachi-dictionary-${SUDACHI_DICT_VERSION}-*.zip"

#####

FROM docker.elastic.co/elasticsearch/elasticsearch:7.8.0

ARG ELASTICSEARCH_SUDACHI_URL="https://github.com/WorksApplications/elasticsearch-sudachi/releases/download/v7.8.0-2.0.2/analysis-sudachi-7.8.0-2.0.2.zip"
ARG SUDACHI_DICT_VERSION="20200330"

# Install plugins
RUN elasticsearch-plugin install analysis-icu && \
    elasticsearch-plugin install analysis-kuromoji && \
    elasticsearch-plugin install ${ELASTICSEARCH_SUDACHI_URL}

# Install sudachi dictionary
COPY --from=sudachi-dict-downloader ./sudachi-dictionary-${SUDACHI_DICT_VERSION} ./config/sudachi
COPY ./elasticsearch/sudachi-settings.json ./config/sudachi/settings.json

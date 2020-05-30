# Download sudachi dictionary
FROM buildpack-deps:buster as sudachi-dict-downloader

ARG SUDACHI_DICT_URL="https://object-storage.tyo2.conoha.io/v1/nc_2520839e1f9641b08211a5c85243124a/sudachi/sudachi-dictionary-20200330-full.zip"
ARG SUDACHI_DICT_VERSION="20200330"

RUN curl -fsSLO ${SUDACHI_DICT_URL} && \
    unzip ./sudachi-dictionary-${SUDACHI_DICT_VERSION}-full.zip

#####

FROM docker.elastic.co/elasticsearch/elasticsearch:7.5.0

ARG ELASTICSEARCH_SUDACHI_URL="https://github.com/WorksApplications/elasticsearch-sudachi/releases/download/v7.5.0-1.3.2/analysis-sudachi-elasticsearch7.5-1.3.2.zip"
ARG SUDACHI_DICT_VERSION="20200330"

# Install plugins
RUN elasticsearch-plugin install analysis-icu && \
    elasticsearch-plugin install analysis-kuromoji && \
    elasticsearch-plugin install ${ELASTICSEARCH_SUDACHI_URL}

# Install sudachi dictionary
COPY ./elasticsearch/sudachi-settings.json ./config/sudachi_tokenizer/settings.json
COPY --from=sudachi-dict-downloader ./sudachi-dictionary-${SUDACHI_DICT_VERSION}/system_full.dic ./config/sudachi_tokenizer/system_full.dic

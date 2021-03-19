const tweetsIndex = {
  settings: {
    analysis: {
      char_filter: {
        url_strip_char_filter: {
          type: 'pattern_replace',
          pattern:
            'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)',
          replacement: ''
        }
      },
      tokenizer: {
        unigram_tokenizer: {
          type: 'ngram',
          min_gram: 1,
          max_gram: 1,
          token_chars: ['letter', 'digit']
        },
        configured_sudachi_tokenizer: {
          type: 'sudachi_tokenizer',
          settings_path: './sudachi/settings.json',
          resources_path: './sudachi'
        }
      },
      analyzer: {
        search_unigram_analyzer: {
          type: 'custom',
          char_filter: ['icu_normalizer', 'kuromoji_iteration_mark'],
          tokenizer: 'unigram_tokenizer'
        },
        search_sudachi_analyzer: {
          type: 'custom',
          tokenizer: 'configured_sudachi_tokenizer',
          filter: [
            'sudachi_split',
            'sudachi_part_of_speech',
            'sudachi_ja_stop',
            'sudachi_normalizedform'
          ]
        },
        tag_sudachi_analyzer: {
          type: 'custom',
          char_filter: ['url_strip_char_filter'],
          tokenizer: 'configured_sudachi_tokenizer',
          filter: [
            'sudachi_part_of_speech',
            'sudachi_ja_stop',
            'sudachi_baseform'
          ]
        }
      }
    }
  },
  mappings: {
    dynamic: 'strict',
    properties: {
      user: {
        type: 'keyword'
      },
      created_at: {
        type: 'date',
        format: 'epoch_second'
      },
      url: {
        type: 'keyword'
      },
      text: {
        type: 'keyword',
        fields: {
          search_unigram: {
            type: 'text',
            analyzer: 'search_unigram_analyzer'
          },
          search_sudachi: {
            type: 'text',
            analyzer: 'search_sudachi_analyzer'
          },
          tag: {
            type: 'text',
            fielddata: true,
            analyzer: 'tag_sudachi_analyzer'
          }
        }
      },
      source: {
        type: 'keyword'
      },
      retweet_count: {
        type: 'integer'
      },
      like_count: {
        type: 'integer'
      }
    }
  }
} as const

export default tweetsIndex

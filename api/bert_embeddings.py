import torch
from transformers import BertTokenizer, BertModel, BertForMaskedLM
import numpy as np


class Embedding():

    def __init__(self):

        # These are run one time for setting up the NLP model.
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.model = BertModel.from_pretrained('bert-base-uncased')
        self.model.eval()

    def get_embedding(self, text):

        marked_text = "[CLS] " + text + " [SEP]"
        tokenized_text = self.tokenizer.tokenize(marked_text)
        indexed_tokens = self.tokenizer.convert_tokens_to_ids(tokenized_text)
        segment_ids = [1]*len(tokenized_text)

        tokens_tensor = torch.tensor([indexed_tokens])
        segment_tensors = torch.tensor([segment_ids])

        with torch.no_grad():
            encoded_layers, _ = self.model(tokens_tensor, segment_tensors)

        return np.array(torch.mean(encoded_layers[-1], 0))

    def similarity(self, e1, e2, metric='cosine'):
        e1 = np.array(e1)
        e2 = np.array(e2)

        if metric == 'cosine':
            return np.sum(e1*e2)
        if metric == 'euclidean':
            return np.sum((e1-e2)**2)

        return 0

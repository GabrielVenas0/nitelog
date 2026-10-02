package github

import "fmt"

type Service struct {
	client *Client
}

func NewService() *Service {
	return &Service{
		client: newClient(),
	}
}

func (s *Service) GitHubTaskSync(repoName, taskTitle, taskDescription string) (string, error) {
	bodyComAssinatura := fmt.Sprintf("%s\n\n---\n*Criada automaticamente via Nitelog.*", taskDescription)

	payload := IssueRequest{
		Title:  taskTitle,
		Body:   bodyComAssinatura,
		Labels: []string{},
	}

	response, err := s.client.PostIssue(repoName, payload)
	if err != nil {
		return "", fmt.Errorf("erro na integração com o github: %w", err)
	}

	return response.HTMLURL, nil
}
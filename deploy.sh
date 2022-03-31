kubectl apply -f kubernetes/beams.yaml -n beams
kubectl apply -f kubernetes/cert-manager.yaml
kubectl apply -f kubernetes/clusterissuer.yaml
kubectl apply -f kubernetes/ingress.yaml -n beams --validate=false

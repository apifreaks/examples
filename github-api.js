
/* Variable that we use in every test */
var endpoint = 'https://api.github.com'; 

/* Variable used when storing the last commit to be used in subsequent test */
var lastCommitSha; 

describe('Github Public API ', function() {
    
    it('should list public user repositories', function(done) {
        request(endpoint + '/users/apifreaks/repos').set('Accept', 'application/vnd.github.v3+json').end(function(res) {
            
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            
            done();
        });
        
    });
    
    it('should get the examples repository', function(done) {
        request(endpoint + '/repos/apifreaks/examples').set('Accept', 'application/vnd.github.v3+json').end(function(res) {
            
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.default_branch).to.equal('master');
            expect(res.body.description).to.not.be.empty();
            
            done();
        });
    });
    
    it('should list commits and store last commit', function(done) {
        request(endpoint + '/repos/apifreaks/examples/commits').set('Accept', 'application/vnd.github.v3+json').end(function(res) {
            
            expect(res.status).to.equal(200); 
            expect(res.body[0]).to.contain.keys('sha');
            
            /* Store sha in a variable. */
            lastCommitSha = res.body[0].sha; 
            
            done();
        });
    });
    
    it('should get last commit by its sha', function(done) {
        request(endpoint + '/repos/apifreaks/examples/commits/' + lastCommitSha).set('Accept', 'application/vnd.github.v3+json').end(function(res) {
            
            expect(res.status).to.equal(200);
            
            done();
        });
    });
    
});
